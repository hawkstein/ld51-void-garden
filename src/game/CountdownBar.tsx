import { motion } from "framer-motion"

export default function CountdownBar({ scaleX }: { scaleX: number }) {
  return (
    <div style={{ width: "100%", padding: "2px", border: "1px solid #e93cac" }}>
      <motion.div
        animate={{ scaleX, transition: { duration: 1, ease: "linear" } }}
        style={{
          originX: 0,
          width: "100%",
          height: "10px",
          backgroundColor: "#fff",
        }}
      />
    </div>
  )
}
