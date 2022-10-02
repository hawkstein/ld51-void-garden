import useScenes, { Scenes } from "./useScenes"
import { Button, Stack, Switch } from "@mantine/core"
import styles from "./SceneRouter.module.scss"
import { ReactComponent as Title } from "./Title.svg"
import useOptions from "../options/useOptions"

export default function MainMenu() {
  const gotoScene = useScenes((store) => store.set)
  const tutorial = useOptions((store) => store.tutorial)
  const setTutorial = useOptions((store) => store.setTutorial)
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
        <div
          style={{ marginTop: "16px", display: "flex", alignItems: "center" }}
        >
          <Switch
            size="lg"
            sx={{ marginRight: "20px" }}
            checked={tutorial}
            onChange={(event) => setTutorial(event.currentTarget.checked)}
          />
          <span
            style={{
              color: "#e93cac",
              fontSize: "1.5rem",
            }}
          >
            Use Tutorial Guide
          </span>
        </div>
        <div style={{ flex: "1", fontSize: "1.2rem" }}>
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
