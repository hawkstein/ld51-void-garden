import { AnimatePresence, motion } from "framer-motion"
import useScenes, { Scenes } from "./useScenes"
import styles from "./SceneRouter.module.scss"
import MainMenu from "./MainMenu"
import Game from "./Game"
import Settings from "./Settings"

const getContent = (scene: string) => {
  switch (scene) {
    case Scenes.Menu:
      return <MainMenu />
    case Scenes.Game:
      return <Game />
    case Scenes.Settings:
      return <Settings />
    default:
      return <h1>No scene found</h1>
  }
}

export default function SceneRouter() {
  const currentScene = useScenes((store) => store.current)
  return (
    <div className={styles.container}>
      <AnimatePresence>
        <motion.div
          key={currentScene}
          className={styles.scene}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            pointerEvents: "none",
            transitionEnd: { pointerEvents: "auto" },
          }}
          exit={{
            opacity: 0,
            pointerEvents: "none",
            transitionEnd: { pointerEvents: "auto" },
          }}
          transition={{ opacity: { duration: 1 } }}
        >
          {getContent(currentScene)}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
