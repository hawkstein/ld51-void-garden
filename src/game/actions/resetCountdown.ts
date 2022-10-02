import { assign } from "xstate"
import { GameContext, GameEvent } from "../gameTypes"

const resetCountdown = assign<GameContext, GameEvent>({
  countdown: 1,
})

export default resetCountdown
