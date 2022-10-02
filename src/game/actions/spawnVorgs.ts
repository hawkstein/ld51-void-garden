import { assign } from "@xstate/immer"
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
  const countOfResources = resources.reduce<Record<ResourceType, number>>(
    (totals, resource) => {
      return { ...totals, [resource.type]: (totals[resource.type] += 1) }
    },
    {
      [ResourceType.Compound]: 0,
      [ResourceType.Energy]: 0,
      [ResourceType.Exotic]: 0,
      [ResourceType.Seed]: 0,
    }
  )
  if (
    countOfResources.Compound >= 1 &&
    countOfResources.Energy >= 1 &&
    countOfResources.Exotic >= 1
  ) {
    return VorgType.Flower
  }
  if (countOfResources.Compound >= 1 && countOfResources.Energy >= 1) {
    return VorgType.Colony
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
  if (vorgType === VorgType.Colony) {
    return [{ offsetX: 5, offsetY: 5, type: ResourceType.Exotic }]
  }
  if (vorgType === VorgType.Flower) {
    return [{ offsetX: 5, offsetY: 5, type: ResourceType.Seed }]
  }
  return []
}

const checkForSpawns = assign<GameContext, GameEvent>((context) => {
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
  const spawns = Object.values(tiles)
    .filter((resources) => resources.length >= 2)
    .map((resources) => {
      const parentTile = context.tiles.find(
        (tile) => resources[0].parent === tile.id
      )
      const type = checkResources(resources)
      if (type) {
        const resourceSpawns = matchResourcesToType(type)
        const id = uniqueId()
        if (parentTile) {
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
      }
    })
    .filter((item) => item !== undefined) as VorgData[]
  if (spawns.length) {
    context.vorgs = [...context.vorgs, ...spawns]
  }
})

export default checkForSpawns
