import HUDOverlay from "./hud/HUDOverlay"
import SceneRouter from "./scenes/SceneRouter"

export default function App() {
  return (
    <div className="layout">
      <HUDOverlay />
      <SceneRouter />
    </div>
  )
}
