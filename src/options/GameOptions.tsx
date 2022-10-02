import { Slider, Switch } from "@mantine/core"
import useOptions from "./useOptions"

export default function GameOptions() {
  const playBgMusic = useOptions((store) => store.playBgMusic)
  const setPlayBgMusic = useOptions((store) => store.setPlayBgMusic)
  const playSfx = useOptions((store) => store.playSfx)
  const setPlaySfx = useOptions((store) => store.setPlaySfx)
  const bgMusicVolume = useOptions((store) => store.bgMusicVolume)
  const setBgMusicVolume = useOptions((store) => store.setBgMusicVolume)
  const sfxVolume = useOptions((store) => store.sfxVolume)
  const setSfxVolume = useOptions((store) => store.setSfxVolume)
  // const preloadImages = useOptions((store) => store.preloadImages)
  // const setPreloadImages = useOptions((store) => store.setPreloadImages)
  const tutorial = useOptions((store) => store.tutorial)
  const setTutorial = useOptions((store) => store.setTutorial)
  return (
    <>
      <h2>Audio Options</h2>
      <div>
        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <Switch
            label="Play Music - Volume"
            size="lg"
            checked={playBgMusic}
            onChange={(event) => {
              setPlayBgMusic(event.currentTarget.checked)
            }}
          />
          <Slider
            size="xl"
            style={{ flex: "1 1", paddingLeft: "16px", maxWidth: "300px" }}
            value={bgMusicVolume}
            onChange={(value) => {
              setBgMusicVolume(value)
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Switch
            label="Play SFX - Volume"
            size="lg"
            checked={playSfx}
            onChange={(event) => {
              setPlaySfx(event.currentTarget.checked)
            }}
          />
          <Slider
            size="xl"
            style={{ flex: "1 1", paddingLeft: "16px", maxWidth: "300px" }}
            value={sfxVolume}
            onChange={(value) => {
              setSfxVolume(value)
            }}
          />
        </div>
      </div>
      <h2>Config</h2>
      <div style={{ marginBottom: "20px" }}>
        <Switch
          label="Tutorial Guide"
          size="lg"
          checked={tutorial}
          onChange={(event) => setTutorial(event.currentTarget.checked)}
        />
      </div>
      {/* <div style={{ marginBottom: "20px" }}>
        <Switch
          label="Preload images"
          size="lg"
          checked={preloadImages}
          onChange={(event) => setPreloadImages(event.currentTarget.checked)}
        />
      </div> */}
    </>
  )
}
