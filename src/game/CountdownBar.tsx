import { motion } from "framer-motion"

export default function CountdownBar({ scaleX }: { scaleX: number }) {
  return (
    <motion.div
      animate={{ scaleX, transition: { duration: 1, ease: "linear" } }}
      style={{
        originX: 0,
        width: "100%",
        height: "10px",
        backgroundColor: "#000",
      }}
    />
  )
}
