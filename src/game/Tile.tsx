import styles from "./Tile.module.scss"

type TileProps = { x: number; y: number; label: string; debug?: boolean }

export default function Tile({ x, y, label, debug = false }: TileProps) {
  return (
    <div
      className={styles.background}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <div className={styles.inner}>
        {debug && <span className={styles.label}>Tile {label}</span>}
      </div>
    </div>
  )
}
