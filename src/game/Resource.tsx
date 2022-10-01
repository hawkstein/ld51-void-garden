import { motion } from "framer-motion"
import styles from "./Resource.module.scss"

type ResourceProps = {
  id: string
  x: number
  y: number
  onDragEnd: (x: number, y: number, id: string) => void
}

export default function Resource({ id, x, y, onDragEnd }: ResourceProps) {
  return (
    <motion.div
      drag
      onDragEnd={(e) => {
        const divContainer = e.target as HTMLDivElement
        const { x, y } = divContainer.getBoundingClientRect()
        onDragEnd(x, y, id)
      }}
      className={styles.resource}
      style={{ left: x, top: y }}
    >
      E!
    </motion.div>
  )
}
