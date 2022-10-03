import { assign } from "@xstate/immer"
import isColliding from "../../utils/circleCollision"
import { FRUIT_FLING_POINTS } from "../constants"
import { GameContext, GameEvent, ResourceType } from "../gameTypes"

const handleResourceDrop = assign<GameContext, GameEvent>((context, event) => {
  const collidingResource = context.resources.findIndex(
    (resource) => resource.id === event.id
  )
  const resource = context.resources[collidingResource]
  if (
    resource?.type === ResourceType.Seed &&
    (event.y < 0 || event.y > 700 || event.x < 0 || event.x > 600)
  ) {
    context.score += FRUIT_FLING_POINTS
    context.tileResources.splice(collidingResource, 1)
    return
  }
  const collision = context.tiles.findIndex((tile) =>
    isColliding(
      { x: tile.x, y: tile.y, radius: 50 },
      { x: event.x, y: event.y, radius: 10 }
    )
  )
  if (collision >= 0 && resource?.type !== ResourceType.Seed) {
    const removed = context.resources.splice(collidingResource, 1).pop()
    const updatedTile = context.tiles[collision]
    const otherResourcesOnThatTile = context.tileResources.filter(
      (resource) => resource.parent === updatedTile.id
    )
    if (removed) {
      const updated = {
        ...removed,
        parent: updatedTile.id,
        x: updatedTile.x + 30 * otherResourcesOnThatTile.length,
        y: updatedTile.y + 80,
      }
      context.tileResources.push(updated)
    }
  }
})

export default handleResourceDrop
