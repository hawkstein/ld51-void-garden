import { Button, Stack } from "@mantine/core"
import useHud from "../hud/useHud"
import useScenes, { Scenes } from "./useScenes"
import { useMachine } from "@xstate/react"
import { createMachine } from "xstate"

const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      on: { TOGGLE: "inactive" },
    },
  },
})

export default function Game() {
  const gotoScene = useScenes((store) => store.set)
  const show = useHud((store) => store.show)
  const [state, send] = useMachine(toggleMachine)
  return (
    <>
      <h1>LD51 Game</h1>
      <h2>ToDo</h2>
      <ul>
        <li>Setup XState to handle game logic</li>
        <li style={{ textDecoration: "line-through" }}>
          Setup controls to display pause/options
        </li>
        <li>Score submission</li>
      </ul>
      <Stack>
        <Button
          onClick={() => {
            gotoScene(Scenes.Menu)
          }}
        >
          Back to main menu
        </Button>
        <Button onClick={() => send("TOGGLE")}>
          {state.value === "inactive"
            ? "Click to activate"
            : "Active! Click to deactivate"}
        </Button>
        <Button
          onClick={() => {
            show(true)
          }}
        >
          Open Options Overlay
        </Button>
      </Stack>
    </>
  )
}
