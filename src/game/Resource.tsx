import { motion } from "framer-motion"
import { useRef } from "react"
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
  [ResourceType.Seed]: styles.exotic,
}

const getStyle = (type: ResourceType) => mappedStyles[type]

const mappedLabels = {
  [ResourceType.Energy]: "E!",
  [ResourceType.Compound]: "C!",
  [ResourceType.Exotic]: "X!",
  [ResourceType.Seed]: "S!",
}

const getLabel = (type: ResourceType) => mappedLabels[type]

export default function Resource({ id, type, x, y, onDragEnd }: ResourceProps) {
  const container = useRef<HTMLDivElement>(null)
  return (
    <motion.div
      ref={container}
      drag
      whileDrag={{ scale: 1.4 }}
      dragTransition={{ restDelta: 5 }}
      onDragEnd={(e) => {
        const divContainer = e.target as HTMLDivElement
        const { x, y } = divContainer.getBoundingClientRect()
        onDragEnd(x, y, id)
      }}
      onDragTransitionEnd={() => {
        if (container.current) {
          const { x, y } = container.current.getBoundingClientRect()
          onDragEnd(x, y, id)
        }
      }}
      className={`${styles.resource} ${getStyle(type)}`}
      style={{ left: x, top: y }}
    >
      {getLabel(type)}
    </motion.div>
  )
}
