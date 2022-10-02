import { assign } from "@xstate/immer"
import { GameContext, GameEvent } from "../gameTypes"

const resetCountdown = assign<GameContext, GameEvent>((context) => {
  context.countdown = 1
})

export default resetCountdown
