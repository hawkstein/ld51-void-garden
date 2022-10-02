import { assign } from "@xstate/immer"
import isColliding from "../../utils/circleCollision"
import { FRUIT_SPAWN_POINTS } from "../constants"
import { GameContext, GameEvent, ResourceType } from "../gameTypes"

const handleResourceDrop = assign<GameContext, GameEvent>((context, event) => {
  const collidingResource = context.resources.findIndex(
    (resource) => resource.id === event.id
  )
  const resource = context.resources[collidingResource]
  if (resource?.type === ResourceType.Seed && (event.y < 0 || event.y > 700)) {
    console.log("Flung!")
    context.score += FRUIT_SPAWN_POINTS
  }
  const collision = context.tiles.findIndex((tile) =>
    isColliding(
      { x: tile.x, y: tile.y, radius: 50 },
      { x: event.x, y: event.y, radius: 10 }
    )
  )
  if (collision >= 0 && resource?.type !== ResourceType.Seed) {
    const duplicateResources = [...context.resources]

    const removed = duplicateResources.splice(collidingResource, 1).pop()
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
      context.tileResources = [...context.tileResources, updated]
    }

    context.resources = duplicateResources
  }
})

export default handleResourceDrop
