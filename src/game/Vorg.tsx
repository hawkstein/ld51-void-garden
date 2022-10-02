import { AnimatePresence, motion } from "framer-motion"
import styles from "./Vorg.module.scss"

type VorgProps = {
  x: number
  y: number
  label: string
  health: number
  debug?: boolean
}

export default function Vorg({
  x,
  y,
  label,
  health,
  debug = false,
}: VorgProps) {
  const damageStyle = health <= 1 ? styles.damaged : ""
  return (
    <div
      className={`${styles.background} ${damageStyle}`}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      {debug && <span className={styles.label}>{label}</span>}
    </div>
  )
}
