import { assign } from "@xstate/immer"
import { uniqueId } from "xstate/lib/utils"
import { GameContext, GameEvent } from "../gameTypes"

const spawnResources = assign<GameContext, GameEvent>(
  (context) =>
    (context.resources = context.vorgs
      .map((vorg) =>
        vorg.resourceSpawns.map((resource) => ({
          id: uniqueId(),
          x: vorg.x + resource.offsetX,
          y: vorg.y + resource.offsetY,
          type: resource.type,
        }))
      )
      .flat())
)

export default spawnResources
