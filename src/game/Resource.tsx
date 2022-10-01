import { motion } from "framer-motion"
import { ResourceType } from "./gameTypes"
import styles from "./Resource.module.scss"

type ResourceProps = {
  id: string
  x: number
  y: number
  type: ResourceType
  onDragEnd: (x: number, y: number, id: string) => void
}

const mappedStyles = {
  [ResourceType.Energy]: styles.energy,
  [ResourceType.Compound]: styles.compound,
  [ResourceType.Exotic]: styles.exotic,
}

const getStyle = (type: ResourceType) => mappedStyles[type]

const mappedLabels = {
  [ResourceType.Energy]: "E!",
  [ResourceType.Compound]: "C!",
  [ResourceType.Exotic]: "X!",
}

const getLabel = (type: ResourceType) => mappedLabels[type]

export default function Resource({ id, type, x, y, onDragEnd }: ResourceProps) {
  return (
    <motion.div
      drag
      onDragEnd={(e) => {
        const divContainer = e.target as HTMLDivElement
        const { x, y } = divContainer.getBoundingClientRect()
        onDragEnd(x, y, id)
      }}
      className={`${styles.resource} ${getStyle(type)}`}
      style={{ left: x, top: y }}
    >
      {getLabel(type)}
    </motion.div>
  )
}
