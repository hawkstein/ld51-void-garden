import { assign } from "xstate"
import { GameContext, GameEvent } from "../gameTypes"

const updateCountdown = assign<GameContext, GameEvent>({
  countdown: (context) => Math.max((context.countdown -= 0.1), 0),
})

export default updateCountdown
