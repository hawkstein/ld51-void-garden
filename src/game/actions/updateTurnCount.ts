import { assign } from "@xstate/immer"
import { GameContext, GameEvent } from "../gameTypes"

const updateTurnCount = assign<GameContext, GameEvent>((context) => {
  context.turn += 1
})

export default updateTurnCount
