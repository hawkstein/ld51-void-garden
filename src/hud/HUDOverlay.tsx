import { Modal } from "@mantine/core"
import useHud from "./useHud"

export default function HUDOverlay() {
  const isHudVisible = useHud((store) => store.visible)
  const show = useHud((store) => store.show)
  return (
    <div>
      <Modal
        opened={isHudVisible}
        onClose={() => show(false)}
        title="Game Options"
      >
        <p>Game Options go here</p>
      </Modal>
    </div>
  )
}
