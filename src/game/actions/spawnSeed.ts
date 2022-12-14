import { assign } from "@xstate/immer"
import { uniqueId } from "xstate/lib/utils"
import { GameContext, GameEvent, ResourceType, VorgType } from "../gameTypes"

const spawnSeed = assign<GameContext, GameEvent>((context) => {
  const tile = context.tiles[Math.floor(Math.random() * 4)]
  const id = uniqueId()
  tile.vorgId = id
  context.vorgs.push({
    id,
    x: tile.x,
    y: tile.y,
    type: VorgType.Seed,
    health: 2,
    resourceSpawns: [
      { offsetX: 5, offsetY: 5, type: ResourceType.Compound },
      { offsetX: 40, offsetY: 5, type: ResourceType.Compound },
      { offsetX: 75, offsetY: 5, type: ResourceType.Compound },
    ],
    storedResources: [{ type: ResourceType.Compound, amount: 9 }],
  })
})

export default spawnSeed
