import useScenes, { Scenes } from "./useScenes"
import { Button, Stack } from "@mantine/core"
import styles from "./SceneRouter.module.scss"
import { ReactComponent as Title } from "./Title.svg"

export default function MainMenu() {
  const gotoScene = useScenes((store) => store.set)
  return (
    <div className={styles.mainMenu}>
      <div>
        <Title />
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
        <div style={{ flex: "1" }}>
          <p>Theme: Every 10 seconds</p>
          <p>
            Void Garden is a resource management game about cultivating a garden
            of vorgs, vacuum organisms or robotic plants bred to survive on
            asteroids.
          </p>
        </div>
      </Stack>
    </div>
  )
}
