import { motion } from "framer-motion"
import { useRef } from "react"
import { ResourceType } from "./gameTypes"
import styles from "./Resource.module.scss"
import { ReactComponent as Energy } from "./Energy.svg"
import { ReactComponent as Compound } from "./Compound.svg"
import { ReactComponent as Exotic } from "./Exotic.svg"
import { ReactComponent as Fruit } from "./Fruit.svg"

type ResourceProps = {
  id: string
  x: number
  y: number
  type: ResourceType
  onDragEnd: (x: number, y: number, id: string) => void
}

const mappedComponents = {
  [ResourceType.Energy]: <Energy height="20px" />,
  [ResourceType.Compound]: <Compound height="20px" />,
  [ResourceType.Exotic]: <Exotic height="20px" />,
  [ResourceType.Seed]: <Fruit height="20px" />,
}

const getComponent = (type: ResourceType) => mappedComponents[type]

const mappedStyles = {
  [ResourceType.Energy]: styles.energy,
  [ResourceType.Compound]: styles.compound,
  [ResourceType.Exotic]: styles.exotic,
  [ResourceType.Seed]: styles.seed,
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
      id={id}
      ref={container}
      drag
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
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
      {getComponent(type)}
    </motion.div>
  )
}
