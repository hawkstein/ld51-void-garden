import create from "zustand"
import { devtools } from "zustand/middleware"

type SceneStore = {
  current: string
  set: (target: string) => void
}

export enum Scenes {
  Menu = "Menu",
  Game = "Game",
  Settings = "Settings",
}

const useScenes = create<SceneStore>()(
  devtools((set) => ({
    current: Scenes.Menu,
    set: (target) => set(() => ({ current: target })),
  }))
)

export default useScenes
