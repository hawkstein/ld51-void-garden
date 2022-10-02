import { createMachine } from "xstate"
import { uniqueId } from "xstate/lib/utils"
import spawnVorgs from "./actions/spawnVorgs"
import damageVorgs from "./actions/damageVorgs"
import handleResourceDrop from "./actions/handleResourceDrop"
import handleResourceTileDrop from "./actions/handleResourceTileDrop"
import reduceSeedStores from "./actions/reduceSeedStores"
import removeGuideId from "./actions/removeGuideId"
import removeResources from "./actions/removeResources"
import removeVorgs from "./actions/removeVorgs"
import resetCountdown from "./actions/resetCountdown"
import setupGuide from "./actions/setupGuide"
import spawnResources from "./actions/spawnResources"
import spawnSeed from "./actions/spawnSeed"
import updateCountdown from "./actions/updateCountdown"
import { GameContext, GameEvent, TileData } from "./gameTypes"
import updateTurnCount from "./actions/updateTurnCount"
import { MAX_TURNS } from "./constants"

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
      guides: ["intro", "collector", "extractor", "end"],
      guideTarget: { x: 0, y: 0, withArrow: true },
      currentGuide: null,
      countdown: 1,
      turn: 1,
      score: 0,
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
            entry: ["spawnResources", "resetCountdown"],
            after: { 1000: "tidyUp" },
          },
          tidyUp: {
            entry: ["reduceSeedStores"],
            always: [
              { target: "guide", cond: "hasGuides" },
              { target: "handleTick" },
            ],
          },
          guide: {
            entry: ["setupGuide"],
            on: {
              GUIDE_CLOSED: "handleTick",
            },
            exit: ["removeGuideId"],
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
            initial: "tick",
            states: {
              tick: {
                entry: "updateCountdown",
                after: { 999: "tick" },
              },
            },
          },
          resolveDamage: {
            entry: ["damageVorgs"],
            always: { target: "spawnCheck" },
          },
          spawnCheck: {
            entry: ["spawnVorgs"],
            always: { target: "resolveTick" },
          },
          resolveTick: {
            entry: ["removeVorgs", "removeResources", "updateTurnCount"],
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
      setupGuide,
      spawnSeed,
      spawnResources,
      reduceSeedStores,
      spawnVorgs,
      removeResources,
      removeGuideId,
      updateCountdown,
      resetCountdown,
      handleResourceDrop,
      handleResourceTileDrop,
      removeVorgs,
      updateTurnCount,
    },
    guards: {
      playerHasWonOrLost: (context) =>
        context.vorgs.length === 0 || context.turn >= MAX_TURNS,
      playerHasWon: (context) => context.turn >= MAX_TURNS,
      playerHasLost: (context) => context.vorgs.length === 0,
      hasGuides: (context) => context.guides.length > 0,
    },
  }
)

export default gameMachine
