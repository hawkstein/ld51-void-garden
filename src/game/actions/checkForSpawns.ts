import { assign } from "xstate"
import { uniqueId } from "xstate/lib/utils"
import {
  GameContext,
  GameEvent,
  ResourceData,
  VorgType,
  ResourceType,
  VorgData,
} from "../gameTypes"

const checkResources = (resources: ResourceData[]): VorgType | null => {
  if (resources.every((r) => r.type === ResourceType.Compound)) {
    return VorgType.Collector
  }
  if (resources.every((r) => r.type === ResourceType.Energy)) {
    return VorgType.Extractor
  }
  return null
}

const matchResourcesToType = (vorgType: VorgType) => {
  if (vorgType === VorgType.Collector) {
    return [
      { offsetX: 5, offsetY: 5, type: ResourceType.Energy },
      { offsetX: 40, offsetY: 5, type: ResourceType.Energy },
    ]
  }
  if (vorgType === VorgType.Extractor) {
    return [
      { offsetX: 5, offsetY: 5, type: ResourceType.Compound },
      { offsetX: 40, offsetY: 5, type: ResourceType.Compound },
    ]
  }
  return []
}

const checkForSpawns = assign<GameContext, GameEvent>({
  vorgs: (context) => {
    const tiles = context.tileResources.reduce<Record<string, ResourceData[]>>(
      (collection, tile) => {
        const parent = context.tiles.find(
          (contextTile) => contextTile.id === tile.parent
        )
        if (tile.parent && !parent?.vorgId) {
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
    const spawns: VorgData[] = Object.values(tiles)
      .filter((resources) => resources.length >= 2)
      .map((resources) => {
        const parentTile = context.tiles.find(
          (tile) => resources[0].parent === tile.id
        )
        const type = checkResources(resources)
        if (!type) {
          throw new Error("No matching vorg for these resources!")
        }
        const resourceSpawns = matchResourcesToType(type)
        const id = uniqueId()
        if (parentTile) {
          // Bad mutation
          parentTile.vorgId = id
        }
        return {
          id,
          x: parentTile?.x ?? 0,
          y: parentTile?.y ?? 0,
          type,
          health: 2,
          resourceSpawns,
        }
      })
    if (spawns.length) {
      return [...context.vorgs, ...spawns]
    }
    return context.vorgs
  },
})

export default checkForSpawns
