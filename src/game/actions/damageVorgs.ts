import { assign } from "@xstate/immer"
import {
  GameContext,
  GameEvent,
  ResourceData,
  ResourceType,
  VorgType,
} from "../gameTypes"
import {
  ConstructedVorgType,
  getRequiresByType,
} from "../utils/requiredResources"

const hasCorrectResources = (
  vorgType: ConstructedVorgType,
  resources: ResourceData[]
) => {
  const requiredResources = getRequiresByType(vorgType)
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
  return requiredResources.every(
    (required) => countOfResources[required.type] >= required.amount
  )
}

const damageVorgs = assign<GameContext, GameEvent>((context) => {
  const resourcesByTileId = context.tileResources.reduce<
    Record<string, ResourceData[]>
  >((collection, tile) => {
    if (tile.parent) {
      return {
        ...collection,
        [tile.parent]: collection[tile.parent]
          ? [...collection[tile.parent], tile]
          : [tile],
      }
    }
    return collection
  }, {})
  const vorgTiles = context.tiles.filter((tile) => tile.vorgId)
  const damagedVorgs = vorgTiles
    .filter((tile) => {
      const vorg = context.vorgs.find((vorg) => vorg.id === tile.vorgId)
      const tileResources = resourcesByTileId[tile.id]
      if (vorg?.type === VorgType.Seed) {
        return false
      }
      if (tileResources && vorg) {
        const isOk = hasCorrectResources(vorg.type, tileResources)
        return !isOk
      }
      return true
    })
    .map((tile) => tile.vorgId)
  damagedVorgs.forEach((vorgId) => {
    const vorg = context.vorgs.find((vorg) => vorg.id === vorgId)
    if (vorg) {
      vorg.health -= 1
    }
  })
})

export default damageVorgs
