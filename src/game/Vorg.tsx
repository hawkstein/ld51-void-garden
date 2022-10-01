import { AnimatePresence, motion } from "framer-motion"
import styles from "./Vorg.module.scss"

export default function Vorg({
  x,
  y,
  label,
}: {
  x: number
  y: number
  label: string
}) {
  return (
    <div
      className={styles.background}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <span className={styles.label}>{label}</span>
    </div>
  )
}
