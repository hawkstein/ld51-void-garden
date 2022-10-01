import create from "zustand"
import { devtools } from "zustand/middleware"

type HudStore = {
  visible: boolean
  show: (visible: boolean) => void
}

const useHud = create<HudStore>()(
  devtools((set) => ({
    visible: false,
    show: (visible) => set(() => ({ visible })),
  }))
)

export default useHud
