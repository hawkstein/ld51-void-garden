import { ReactNode } from "react"

export type GuideId = "intro" | "collector" | "extractor" | "end"

const idMappedToCopy: Record<GuideId, ReactNode> = {
  intro: (
    <span>
      This is your seed vacuum organism. It will generate Compound resources for
      a few rounds and then disappear. Drag two of them to another tile.
    </span>
  ),
  collector:
    "A solar collector gathers energy every ten seconds and requires 1 compound resource. Without a Compound, tt will become damaged first and then be destroyed.",
  extractor:
    "An extractor generates 2 compound every ten seconds and requires 1 energy.",
  end: "If there are no vacuum organisms left, then the game ends. Good luck!",
}

export default function getGuideCopy(id: GuideId | null) {
  if (!id) {
    return "No guide found"
  }
  return idMappedToCopy[id]
}
