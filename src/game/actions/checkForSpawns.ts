import { assign } from "xstate"
import { uniqueId } from "xstate/lib/utils"
import {
  GameContext,
  GameEvent,
  ResourceData,
  VorgType,
  ResourceType,
} from "../gameTypes"

const checkForSpawns = assign<GameContext, GameEvent>({
  vorgs: (context, event) => {
    const tiles = context.tileResources.reduce<Record<string, ResourceData[]>>(
      (collection, tile) => {
        if (tile.parent) {
          return {
            ...collection,
            [tile.parent]: collection[tile.parent]
              ? [...collection[tile.parent], tile]
              : [tile],
          }
        }
        return collection
      },
      {}
    )
    const spawns = Object.values(tiles)
      .filter((resources) => resources.length >= 2)
      .map((resource) => {
        const parentTile = context.tiles.find(
          (tile) => resource[0].parent === tile.id
        )
        return {
          id: uniqueId(),
          x: parentTile?.x,
          y: parentTile?.y,
          type: VorgType.Collector,
          resourceSpawns: [
            { offsetX: 5, offsetY: 5, type: ResourceType.Energy },
            { offsetX: 40, offsetY: 5, type: ResourceType.Energy },
          ],
        }
      })
    if (spawns.length) {
      return [...context.vorgs, ...spawns]
    }
    return context.vorgs
  },
})

export default checkForSpawns
