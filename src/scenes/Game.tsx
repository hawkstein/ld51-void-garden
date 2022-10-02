import { Button, Grid } from "@mantine/core"
import useScenes, { Scenes } from "./useScenes"
import Board from "../game/Board"
import { useState } from "react"
import { ReactComponent as Title } from "./Title.svg"

export default function Game() {
  const gotoScene = useScenes((store) => store.set)
  const [paused, setPaused] = useState(false)
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Board paused={paused} />
      <Grid align="center" sx={{ marginTop: "auto" }}>
        <Grid.Col span="auto">
          <Button
            onClick={() => {
              gotoScene(Scenes.Menu)
            }}
          >
            Back to main menu
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title />
        </Grid.Col>
        <Grid.Col span="auto">
          <Button
            onClick={() => {
              setPaused((previous) => !previous)
            }}
          >
            {paused ? "Resume" : "Pause"}
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  )
}
