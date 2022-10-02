import { createMachine, assign } from "xstate"
import { uniqueId } from "xstate/lib/utils"
import checkForSpawns from "./actions/checkForSpawns"
import damageVorgs from "./actions/damageVorgs"
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
        // "init" is here to prevent some strange multiple (10x) calling of the spawnSeed action on initial render
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
            after: { 10000: "resolveDamage" },
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
          resolveDamage: {
            entry: ["damageVorgs"],
            always: { target: "spawnCheck" },
          },
          spawnCheck: {
            entry: ["checkForSpawns"],
            always: { target: "resolveTick" },
          },
          resolveTick: {
            entry: ["removeVorgs", "removeResources"],
            after: {
              1000: [
                { target: "finished", cond: "playerHasWonOrLost" },
                { target: "setupTick" },
              ],
            },
          },
          finished: {
            type: "final",
          },
        },
        onDone: [
          {
            target: "gameover",
            cond: "playerHasLost",
          },
          {
            target: "success",
            cond: "playerHasWon",
          },
        ],
      },
      gameover: { type: "final" },
      success: { type: "final" },
    },
  },
  {
    actions: {
      damageVorgs,
      spawnSeed,
      spawnResources,
      reduceSeedStores,
      checkForSpawns,
      removeResources,
      handleResourceDrop,
      handleResourceTileDrop,
      removeVorgs,
    },
    guards: {
      playerHasWonOrLost: (context) => context.vorgs.length === 0,
      playerHasWon: (context) => false,
      playerHasLost: (context) => context.vorgs.length === 0,
    },
  }
)

export default gameMachine
