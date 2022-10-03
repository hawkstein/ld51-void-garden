import { assign } from "@xstate/immer"
import { FRUIT_FLING_POINTS } from "../constants"
import { GameContext, GameEvent, ResourceType } from "../gameTypes"

const removeResources = assign<GameContext, GameEvent>((context) => {
  // Check if there are any fruit of bounds that missed firing events
  const fruit = context.resources
    .filter((resource) => resource.type === ResourceType.Seed)
    .filter((resource) => {
      const div = document.getElementById(resource.id)
      if (div) {
        const rect = div.getBoundingClientRect()
        const isOutOfBounds =
          rect.x < 0 || rect.x > 800 || rect.y < 0 || rect.y > 1000
        return isOutOfBounds
      }
      return false
    })
  context.score += fruit.length * FRUIT_FLING_POINTS
  context.resources = []
  context.tileResources = []
})

export default removeResources
