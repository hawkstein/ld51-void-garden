import { assign } from "xstate"
import isColliding from "../../utils/circleCollision"
import { GameContext, GameEvent } from "../gameTypes"

const handleResourceDrop = assign<GameContext, GameEvent>((context, event) => {
  const collision = context.tiles.findIndex((tile) =>
    isColliding(
      { x: tile.x, y: tile.y, radius: 50 },
      { x: event.x, y: event.y, radius: 10 }
    )
  )
  if (collision >= 0) {
    const duplicateResources = [...context.resources]
    const collidingResource = context.resources.findIndex(
      (resource) => resource.id === event.id
    )
    const removed = duplicateResources.splice(collidingResource, 1).pop()
    const updatedTile = context.tiles[collision]
    return {
      resources: duplicateResources,
      tileResources: [
        ...context.tileResources,
        {
          ...removed,
          parent: updatedTile.id,
          x: updatedTile.x,
          y: updatedTile.y + 80,
        },
      ],
    }
  }
  return context
})

export default handleResourceDrop
