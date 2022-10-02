import { assign } from "@xstate/immer"
import { uniqueId } from "xstate/lib/utils"
import isColliding from "../../utils/circleCollision"
import { GameContext, GameEvent } from "../gameTypes"

const handleResourceTileDrop = assign<GameContext, GameEvent>(
  (context, event) => {
    const collision = context.tiles.findIndex((tile) =>
      isColliding(
        { x: tile.x, y: tile.y, radius: 50 },
        { x: event.x, y: event.y, radius: 10 }
      )
    )
    if (collision >= 0) {
      const collidingResource = context.tileResources.find(
        (resource) => resource.id === event.id
      )
      const updatedTile = context.tiles[collision]
      const otherResourcesOnThatTile = context.tileResources.filter(
        (resource) => resource.parent === updatedTile.id
      )
      if (collidingResource) {
        collidingResource.x =
          updatedTile.x + 30 * otherResourcesOnThatTile.length
        collidingResource.y = updatedTile.y + 80
        collidingResource.id = uniqueId()
        collidingResource.parent = updatedTile.id
      }
    }
  }
)

export default handleResourceTileDrop
