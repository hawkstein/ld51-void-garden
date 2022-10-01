import { Button } from "@mantine/core"
import GameOptions from "../options/GameOptions"
import useScenes, { Scenes } from "./useScenes"

export default function Settings() {
  const gotoScene = useScenes((store) => store.set)
  return (
    <>
      <h1>Settings</h1>
      <GameOptions />
      <Button
        onClick={() => {
          gotoScene(Scenes.Menu)
        }}
      >
        Back to main menu
      </Button>
    </>
  )
}
