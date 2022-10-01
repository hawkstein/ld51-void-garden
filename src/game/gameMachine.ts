import { createMachine, assign } from "xstate"
import { uniqueId } from "xstate/lib/utils"
import checkForSpawns from "./actions/checkForSpawns"
import handleResourceDrop from "./actions/handleResourceDrop"
import handleResourceTileDrop from "./actions/handleResourceTileDrop"
import spawnResources from "./actions/spawnResources"
import spawnVorg from "./actions/spawnVorg"
import { GameContext, GameEvent, TileData } from "./gameTypes"

const tiles: TileData[] = [
  { id: uniqueId(), x: 20, y: 100 },
  { id: uniqueId(), x: 220, y: 100 },
  { id: uniqueId(), x: 420, y: 100 },
  { id: uniqueId(), x: 620, y: 100 },
  { id: uniqueId(), x: 120, y: 200 },
  { id: uniqueId(), x: 320, y: 200 },
  { id: uniqueId(), x: 520, y: 200 },
  { id: uniqueId(), x: 220, y: 300 },
  { id: uniqueId(), x: 420, y: 300 },
  { id: uniqueId(), x: 320, y: 400 },
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
