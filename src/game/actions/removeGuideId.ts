import { assign } from "@xstate/immer"
import { GameContext, GameEvent } from "../gameTypes"

const removeGuideId = assign<GameContext, GameEvent>((context) => {
  context.guides.shift()
})

export default removeGuideId
