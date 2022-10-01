import styles from "./Tile.module.scss"

type TileProps = { x: number; y: number; label: string }

export default function Tile({ x, y, label }: TileProps) {
  return (
    <div
      className={styles.background}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <span className={styles.label}>Tile {label}</span>
    </div>
  )
}
