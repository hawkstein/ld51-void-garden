import { assign } from "@xstate/immer"
import { GameContext, GameEvent } from "../gameTypes"

const removeResources = assign<GameContext, GameEvent>((context) => {
  context.resources = []
  context.tileResources = []
})

export default removeResources
