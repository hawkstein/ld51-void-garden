import { useMachine } from "@xstate/react"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react"
import { SimulatedClock } from "xstate/lib/SimulatedClock"
import gameMachine from "./gameMachine"
import Resource from "./Resource"
import Tile from "./Tile"
import Vorg from "./Vorg"

type BoardProps = {
  paused?: boolean
}

const simulatedClock = new SimulatedClock()

export default function Board({ paused = false }: BoardProps) {
  const [state, send] = useMachine(gameMachine, { clock: simulatedClock })
  useEffect(() => {
    let id: number
    if (!paused) {
      id = setInterval(() => {
        simulatedClock.increment(100)
      }, 100)
    }
    return () => {
      clearInterval(id)
    }
  }, [paused])

  const boardContainer = useRef<HTMLDivElement>(null)

  const handleDragEnd = (x: number, y: number, id: string) => {
    const rect = boardContainer.current?.getBoundingClientRect()
    const { x: parentX, y: parentY } = rect ?? { x: 0, y: 0 }
    send("RESOURCE_DROP", { x: x - parentX, y: y - parentY, id })
  }

  const handleTileDragEnd = (x: number, y: number, id: string) => {
    const rect = boardContainer.current?.getBoundingClientRect()
    const { x: parentX, y: parentY } = rect ?? { x: 0, y: 0 }
    send("RESOURCE_TILE_DROP", { x: x - parentX, y: y - parentY, id })
  }

  const tiles = state.context.tiles
  const vorgs = state.context.vorgs
  const resources = state.context.resources
  const tileResources = state.context.tileResources
  return (
    <>
      <div>{state.toStrings().join(", ")}</div>
      <div
        ref={boardContainer}
        style={{ width: "700px", height: "600px", position: "relative" }}
      >
        {tiles.map(({ id, x, y }) => (
          <Tile key={id} x={x} y={y} label={id} />
        ))}
        {vorgs.map(({ id, x, y, type }) => {
          return <Vorg key={id} x={x} y={y} label={type} />
        })}
        <AnimatePresence>
          {resources.map(({ x, y, id, type }) => (
            <Resource
              key={id}
              id={id}
              type={type}
              x={x}
              y={y}
              onDragEnd={handleDragEnd}
            />
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {tileResources.map(({ x, y, id, type }) => (
            <Resource
              key={id}
              id={id}
              type={type}
              x={x}
              y={y}
              onDragEnd={handleTileDragEnd}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
