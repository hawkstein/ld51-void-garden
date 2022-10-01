import { Button, Stack } from "@mantine/core"
import useHud from "../hud/useHud"
import useScenes, { Scenes } from "./useScenes"
import Board from "../game/Board"
import { useState } from "react"

export default function Game() {
  const gotoScene = useScenes((store) => store.set)
  const show = useHud((store) => store.show)
  const [paused, setPaused] = useState(false)
  return (
    <>
      <h1>Void Garden</h1>
      <Board paused={paused} />
      <Stack>
        <Button
          onClick={() => {
            gotoScene(Scenes.Menu)
          }}
        >
          Back to main menu
        </Button>
        <Button
          onClick={() => {
            show(true)
          }}
        >
          Open Options Overlay
        </Button>
        <Button
          onClick={() => {
            setPaused((previous) => !previous)
          }}
        >
          {paused ? "Resume" : "Pause"}
        </Button>
      </Stack>
    </>
  )
}
