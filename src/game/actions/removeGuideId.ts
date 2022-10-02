import { assign } from "xstate"
import { GameContext, GameEvent, VorgType } from "../gameTypes"

const removeGuideId = assign<GameContext, GameEvent>((context) => {
  const guides = [...context.guides]
  guides.shift()
  return {
    guides,
  }
})

export default removeGuideId
