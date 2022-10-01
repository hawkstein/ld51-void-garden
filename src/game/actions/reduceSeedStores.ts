import { assign } from "xstate"
import { GameContext, GameEvent, VorgType } from "../gameTypes"

const reduceSeedStores = assign<GameContext, GameEvent>({
  vorgs: (context) => {
    const seedVorg = context.vorgs.find((vorg) => vorg.type === VorgType.Seed)
    if (seedVorg) {
      const amounts = seedVorg.resourceSpawns.length
      seedVorg.storedResources = seedVorg.storedResources?.map((store) => ({
        ...store,
        amount: (store.amount -= amounts),
      }))
    }
    return context.vorgs
  },
})

export default reduceSeedStores
