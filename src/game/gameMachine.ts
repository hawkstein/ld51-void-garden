import { createMachine, assign } from "xstate"
import { uniqueId } from "xstate/lib/utils"
import checkForSpawns from "./actions/checkForSpawns"
import handleResourceDrop from "./actions/handleResourceDrop"
import handleResourceTileDrop from "./actions/handleResourceTileDrop"
import spawnResources from "./actions/spawnResources"
import spawnVorg from "./actions/spawnVorg"
import { GameContext, GameEvent, TileData } from "./gameTypes"

const tiles: TileData[] = [
  { id: uniqueId(), x: 50, y: 100 },
  { id: uniqueId(), x: 250, y: 100 },
  { id: uniqueId(), x: 450, y: 100 },
  { id: uniqueId(), x: 150, y: 200 },
  { id: uniqueId(), x: 350, y: 200 },
  { id: uniqueId(), x: 250, y: 300 },
]

const gameMachine = createMachine(
  {
    predictableActionArguments: true,
    id: "game",
    context: {
      tiles,
      vorgs: [],
      resources: [],
      tileResources: [],
    } as GameContext,
    schema: {
      events: {} as GameEvent,
    },
    initial: "ready",
    states: {
      ready: {
        entry: ["spawnVorg"],
        always: { target: "play" },
      },
      play: {
        initial: "setupTick",
        states: {
          setupTick: {
            entry: ["spawnResources"],
            after: { 1000: "handleTick" },
          },
          handleTick: {
            after: { 10000: "resolveTick" },
            on: {
              RESOURCE_DROP: {
                internal: true,
                actions: ["handleResourceDrop"],
              },
              RESOURCE_TILE_DROP: {
                internal: true,
                actions: ["handleResourceTileDrop"],
              },
            },
          },
          resolveTick: {
            entry: ["checkForSpawns", "removeResources"],
            after: { 1000: "setupTick" },
          },
        },
      },
    },
  },
  {
    actions: {
      spawnVorg,
      spawnResources,
      checkForSpawns,
      removeResources: assign({
        resources: (context) => [],
        tileResources: (context) => [],
      }),
      handleResourceDrop,
      handleResourceTileDrop,
    },
  }
)

export default gameMachine
