import { assign } from "xstate"
import { uniqueId } from "xstate/lib/utils"
import { GameContext, GameEvent, ResourceType, VorgType } from "../gameTypes"

const spawnVorg = assign<GameContext, GameEvent>({
  vorgs: (context) => {
    const tile = context.tiles[Math.floor(Math.random() * context.tiles.length)]
    return [
      ...context.vorgs,
      {
        id: uniqueId(),
        x: tile.x,
        y: tile.y,
        type: VorgType.Collector,
        resourceSpawns: [
          { offsetX: 5, offsetY: 5, type: ResourceType.Energy },
          { offsetX: 40, offsetY: 5, type: ResourceType.Energy },
        ],
      },
    ]
  },
})

export default spawnVorg
