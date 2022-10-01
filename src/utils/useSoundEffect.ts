import { useEffect } from "react"
import useSound from "use-sound"
import useOptions from "../options/useOptions"

export default function useSoundEffect(src: string) {
  const playSfx = useOptions((store) => store.playSfx)
  const [_, { sound }] = useSound(src, {
    preload: true,
    soundEnabled: playSfx,
  })
  useEffect(() => {
    if (playSfx) {
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
  }, [sound, playSfx])
  return sound
}
