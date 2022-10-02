import { ReactNode } from "react"
import { ReactComponent as Energy } from "../Energy.svg"
import { ReactComponent as Compound } from "../Compound.svg"
import { ReactComponent as Exotic } from "../Exotic.svg"
import { ReactComponent as Fruit } from "../Fruit.svg"

export type GuideId = "intro" | "collector" | "extractor" | "exotic" | "end"

const idMappedToCopy: Record<GuideId, ReactNode> = {
  intro: (
    <>
      <p>
        This is your starting vacuum organism, a seed from the stars. It will
        generate 3 compound <Compound width="20px" /> resources for a few rounds
        and then disappear.
      </p>
      <p>
        Drag two <Compound width="20px" /> resources to another location tile.
      </p>
    </>
  ),
  collector: (
    <>
      <p>
        A solar collector gathers 2 energy <Energy width="20px" />
        every ten second turn and requires 1 compound <Compound width="20px" />
        resource per turn.{" "}
      </p>
      <p>
        Without a <Compound width="20px" />, it will become damaged and then be
        destroyed if it happens again.
      </p>
      <p>
        Drag a <Compound width="20px" /> onto your collector, build an extractor
        with 2 <Energy width="20px" /> and another collector with 2{" "}
        <Compound width="20px" />
      </p>
    </>
  ),
  extractor: (
    <>
      <p>
        An extractor generates 2 <Compound width="20px" /> every ten seconds and
        requires 1 <Energy width="20px" />
      </p>
      <p>
        This is the last turn your original vacuum organism will generate
        compound resources.
      </p>
    </>
  ),
  exotic: (
    <>
      <p>
        A colony is built with 1 <Compound width="20px" /> and 1{" "}
        <Energy width="20px" />. It requires the same each turn but it produces
        an exotic resource <Exotic width="20px" />
      </p>
      <p>
        These can be used to build the final type of vacuum organism. The
        factory that constructs fruit to fling to more asteroids and out into
        deep space.
      </p>
      <p>
        These require 1 <Compound width="20px" />, 1 <Energy width="20px" /> and
        1 <Exotic width="20px" /> to both build and maintain. The fruit they
        produce scores a lot of points when you throw them off into space
        (off-screen).
      </p>
    </>
  ),
  end: (
    <>
      <p>If there are no vacuum organisms left, then the game ends.</p>
      <p>Try to get your score as high as you can within 24 turns!</p>{" "}
      <p>Good luck and thanks for playing!</p>
    </>
  ),
}

export default function getGuideCopy(id: GuideId | null) {
  if (!id) {
    return "No guide found"
  }
  return idMappedToCopy[id]
}
