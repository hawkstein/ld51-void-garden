import { assign } from "xstate"
import { GameContext, GameEvent } from "../gameTypes"

const removeResources = assign<GameContext, GameEvent>({
  resources: (context) => [],
  tileResources: (context) => [],
})

export default removeResources
