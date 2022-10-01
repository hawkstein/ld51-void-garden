import { useEffect } from "react"
import useSound from "use-sound"
import useOptions from "../options/useOptions"

export default function useBackgroundTrack(src: string) {
  const playBgMusic = useOptions((store) => store.playBgMusic)
  const [_, { sound }] = useSound(src, {
    preload: true,
    loop: true,
    soundEnabled: playBgMusic,
  })
  useEffect(() => {
    if (playBgMusic) {
      setTimeout(() => {
        sound?.play()
        sound?.fade(0, 1, 1000)
      }, 1000)
    } else {
      sound?.pause()
    }
    return () => {
      sound?.fade(1, 0, 1000)
      setTimeout(() => {
        sound?.stop()
      }, 1100)
    }
  }, [sound, playBgMusic])
  return sound
}
