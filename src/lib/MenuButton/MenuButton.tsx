import { motion } from "framer-motion"
import { ReactNode } from "react"
import styles from "./Button.module.scss"

export type ButtonProps = {
  children: ReactNode
  onClick?: () => void
}

const backgroundVariants = {
  initial: {
    opacity: 0,
    scale: 0.7,
  },
  hover: {
    opacity: 1,
    scale: 1,
  },
}

const labelVariants = {
  initial: {
    color: "#000",
  },
  hover: {
    color: "#FFF",
  },
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <motion.div
      className={styles.container}
      onClick={onClick}
      whileHover="hover"
      initial="initial"
    >
      <motion.div className={styles.label} variants={labelVariants}>
        {children}
      </motion.div>
      <motion.div
        className={styles.background}
        variants={backgroundVariants}
      ></motion.div>
    </motion.div>
  )
}
