import { createMachine, assign } from "xstate"
import { uniqueId } from "xstate/lib/utils"
import checkForSpawns from "./actions/checkForSpawns"
import handleResourceDrop from "./actions/handleResourceDrop"
import handleResourceTileDrop from "./actions/handleResourceTileDrop"
import reduceSeedStores from "./actions/reduceSeedStores"
import removeResources from "./actions/removeResources"
import removeVorgs from "./actions/removeVorgs"
import spawnResources from "./actions/spawnResources"
import spawnSeed from "./actions/spawnSeed"
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
    preserveActionOrder: true,
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
    initial: "init",
    states: {
      init: {
        after: { 100: "ready" },
      },
      ready: {
        entry: ["spawnSeed"],
        always: { target: "play" },
      },
      play: {
        initial: "setupTick",
        states: {
          setupTick: {
            entry: ["spawnResources"],
            after: { 1000: "tidyUp" },
          },
          tidyUp: {
            entry: ["reduceSeedStores"],
            always: { target: "handleTick" },
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
            entry: ["removeVorgs", "checkForSpawns", "removeResources"],
            after: { 1000: "setupTick" },
          },
        },
      },
    },
  },
  {
    actions: {
      spawnSeed,
      spawnResources,
      reduceSeedStores,
      checkForSpawns,
      removeResources,
      handleResourceDrop,
      handleResourceTileDrop,
      removeVorgs,
    },
  }
)

export default gameMachine
