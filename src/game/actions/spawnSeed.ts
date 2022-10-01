import { assign } from "xstate"
import { uniqueId } from "xstate/lib/utils"
import { GameContext, GameEvent, ResourceType, VorgType } from "../gameTypes"

const spawnSeed = assign<GameContext, GameEvent>({
  vorgs: (context) => {
    const tile = context.tiles[Math.floor(Math.random() * 4)]
    return [
      ...context.vorgs,
      {
        id: uniqueId(),
        x: tile.x,
        y: tile.y,
        type: VorgType.Seed,
        resourceSpawns: [
          { offsetX: 5, offsetY: 5, type: ResourceType.Compound },
          { offsetX: 40, offsetY: 5, type: ResourceType.Compound },
        ],
        storedResources: [{ type: ResourceType.Compound, amount: 4 }],
      },
    ]
  },
})

export default spawnSeed