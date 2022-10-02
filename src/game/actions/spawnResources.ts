import { assign } from "@xstate/immer"
import { uniqueId } from "xstate/lib/utils"
import { EXOTIC_SPAWN_POINTS, FRUIT_SPAWN_POINTS } from "../constants"
import { GameContext, GameEvent, ResourceType } from "../gameTypes"

const spawnResources = assign<GameContext, GameEvent>((context) => {
  const spawns = context.vorgs
    .map((vorg) =>
      vorg.resourceSpawns.map((resource) => ({
        id: uniqueId(),
        x: vorg.x + resource.offsetX,
        y: vorg.y + resource.offsetY,
        type: resource.type,
      }))
    )
    .flat()
  context.resources = spawns
  const exotics = spawns.filter(
    (resource) => resource.type === ResourceType.Exotic
  )
  const fruit = spawns.filter((resource) => resource.type === ResourceType.Seed)
  context.score +=
    exotics.length * EXOTIC_SPAWN_POINTS + fruit.length * FRUIT_SPAWN_POINTS
})

export default spawnResources
