import { assign } from "xstate"
import { GameContext, GameEvent, VorgType } from "../gameTypes"

const removeVorgs = assign<GameContext, GameEvent>({
  vorgs: (context) => {
    const destroyed = context.vorgs.filter((vorg) => vorg.health <= 0)
    const emptySeeds = context.vorgs.filter(
      (vorg) =>
        vorg.type === VorgType.Seed &&
        vorg.storedResources?.every((resource) => resource.amount <= 0)
    )
    const vorgs = context.vorgs.filter(
      (vorg) =>
        !destroyed.some((dead) => dead.id === vorg.id) &&
        !emptySeeds.some((seed) => seed.id === vorg.id)
    )
    destroyed.forEach((dead) => {
      const tile = context.tiles.find((tile) => tile.vorgId === dead.id)
      if (tile) {
        tile.vorgId = undefined
      }
    })
    emptySeeds.forEach((seed) => {
      const tile = context.tiles.find((tile) => tile.vorgId === seed.id)
      if (tile) {
        tile.vorgId = undefined
      }
    })
    return vorgs
  },
})

export default removeVorgs
