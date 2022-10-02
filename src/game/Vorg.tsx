import { motion } from "framer-motion"
import { VorgType } from "./gameTypes"
import styles from "./Vorg.module.scss"

import { ReactComponent as SeedVorg } from "./SeedVorg.svg"
import { ReactComponent as CollectorVorg } from "./CollectorVorg.svg"
import { ReactComponent as ExtractorVorg } from "./ExtractorVorg.svg"
import { ReactComponent as ColonyVorg } from "./ColonyVorg.svg"
import { ReactComponent as FruitVorg } from "./FruitVorg.svg"
import { ReactElement } from "react"

type VorgProps = {
  x: number
  y: number
  label: string
  health: number
  type: VorgType
  debug?: boolean
}

const vorgMappedToType: Record<VorgType, ReactElement> = {
  [VorgType.Seed]: <SeedVorg />,
  [VorgType.Collector]: <CollectorVorg />,
  [VorgType.Extractor]: <ExtractorVorg />,
  [VorgType.Colony]: <ColonyVorg />,
  [VorgType.Flower]: <FruitVorg />,
}

const vorgFromType = (type: VorgType) => vorgMappedToType[type]

const styleMappedToType: Record<VorgType, string> = {
  [VorgType.Seed]: styles.seed,
  [VorgType.Collector]: styles.collector,
  [VorgType.Extractor]: styles.extractor,
  [VorgType.Colony]: styles.colony,
  [VorgType.Flower]: styles.flower,
}

const styleFromType = (type: VorgType) => styleMappedToType[type]

export default function Vorg({
  x,
  y,
  label,
  type,
  health,
  debug = false,
}: VorgProps) {
  const damageStyle = health <= 1 ? styles.damaged : ""
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${styles.background} ${styleFromType(type)} ${damageStyle}`}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      {vorgFromType(type)}
      {debug && <span className={styles.label}>{label}</span>}
    </motion.div>
  )
}
