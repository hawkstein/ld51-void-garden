import useScenes, { Scenes } from "./useScenes"
import useBackgroundTrack from "../utils/useBackgroundTrack"
import { Button, Image, Stack } from "@mantine/core"
import styles from "./SceneRouter.module.scss"

export default function MainMenu() {
  const gotoScene = useScenes((store) => store.set)
  //const bgMusic = useBackgroundTrack("./music_track.mp3")
  return (
    <>
      <Image
        radius="md"
        width="100%"
        height="400px"
        sx={{ marginTop: "24px" }}
        withPlaceholder
        fit="contain"
        alt="LD51 Splash Image"
      />
      <h1 style={{ textAlign: "center" }}>Void Garden</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: "1" }}>
          <p>Theme: Every 10 seconds</p>
          <p>
            Void Garden is a resource management game about cultivating a garden
            of vorgs, vacuum organisms or robotic plants bred to survive on
            asteroids.
          </p>
        </div>
        <Stack className={styles.menuStack}>
          <Button
            onClick={() => {
              gotoScene(Scenes.Game)
            }}
          >
            Start
          </Button>
          <Button
            onClick={() => {
              gotoScene(Scenes.Settings)
            }}
          >
            Settings
          </Button>
        </Stack>
      </div>
    </>
  )
}
