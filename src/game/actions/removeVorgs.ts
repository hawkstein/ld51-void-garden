import { assign } from "xstate"
import { GameContext, GameEvent, VorgType } from "../gameTypes"

const removeVorgs = assign<GameContext, GameEvent>({
  vorgs: (context) => {
    const vorgs = context.vorgs.filter(
      (vorg) =>
        vorg.health > 0 &&
        vorg.type !== VorgType.Seed &&
        vorg.storedResources?.some((resource) => resource.amount > 0)
    )
    return vorgs
  },
})

export default removeVorgs
