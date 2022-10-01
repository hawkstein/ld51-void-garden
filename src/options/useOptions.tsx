import create from "zustand"
import { devtools } from "zustand/middleware"

type Options = {
  playBgMusic: boolean
  setPlayBgMusic: (value: boolean) => void
  bgMusicVolume: number
  playSfx: boolean
  setPlaySfx: (value: boolean) => void
  sfxVolume: number
  preloadImages: boolean
  setPreloadImages: (value: boolean) => void
  setSfxVolume: (volume: number) => void
  setBgMusicVolume: (volume: number) => void
}

const useOptions = create<Options>()(
  devtools((set) => ({
    playBgMusic: true,
    setPlayBgMusic: (playBgMusic) =>
      set((state) => ({ ...state, playBgMusic })),
    setPlaySfx: (playSfx) => set((state) => ({ ...state, playSfx })),
    bgMusicVolume: 100,
    setBgMusicVolume: (bgMusicVolume) =>
      set((state) => ({
        ...state,
        bgMusicVolume,
      })),
    playSfx: true,
    sfxVolume: 100,
    setSfxVolume: (sfxVolume) =>
      set((state) => ({
        ...state,
        sfxVolume,
      })),
    preloadImages: true,
    setPreloadImages: (preloadImages) =>
      set((state) => ({ ...state, preloadImages })),
  }))
)

export default useOptions
