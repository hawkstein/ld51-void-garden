import { assign } from "@xstate/immer"
import { GameContext, GameEvent, VorgType } from "../gameTypes"

const setupGuide = assign<GameContext, GameEvent>((context, event) => {
  const nextGuide = context.guides[0] ?? null
  let x = 0,
    y = 0,
    withArrow = true
  if (nextGuide === "intro") {
    const seed = context.vorgs.find((vorg) => vorg.type === VorgType.Seed)
    if (seed) {
      x = seed.x
      y = seed.y
    }
  } else if (nextGuide === "collector") {
    const collector = context.vorgs.find(
      (vorg) => vorg.type === VorgType.Collector
    )
    if (collector) {
      x = collector.x
      y = collector.y
    } else {
      withArrow = false
      x = 700 / 2
      y = 500 / 2
    }
  } else if (nextGuide === "extractor") {
    const extractor = context.vorgs.find(
      (vorg) => vorg.type === VorgType.Extractor
    )
    if (extractor) {
      x = extractor.x
      y = extractor.y
    } else {
      withArrow = false
      x = 700 / 2
      y = 500 / 2
    }
  } else if (nextGuide === "end") {
    withArrow = false
    x = 700 / 2
    y = 500 / 2
  }

  context.currentGuide = nextGuide
  context.guideTarget = { x, y, withArrow }
})

export default setupGuide
