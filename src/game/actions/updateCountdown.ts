import { assign } from "@xstate/immer"
import { GameContext, GameEvent } from "../gameTypes"

const updateCountdown = assign<GameContext, GameEvent>(
  (context) => (context.countdown = Math.max((context.countdown -= 0.1), 0))
)

export default updateCountdown
