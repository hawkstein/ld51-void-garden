import { Overlay, Popover } from "@mantine/core"
import { useMachine } from "@xstate/react"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react"
import { SimulatedClock } from "xstate/lib/SimulatedClock"
import CountdownBar from "./CountdownBar"
import gameMachine from "./gameMachine"
import Resource from "./Resource"
import Tile from "./Tile"
import getGuideCopy from "./utils/getGuideCopy"
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
  const isGameOver = state.matches("gameover")
  const displayGuide = state.matches("play.guide")
  return (
    <>
      <div>{state.toStrings().join(", ")}</div>
      {displayGuide && <Overlay opacity={0} color="#000" />}
      <div
        ref={boardContainer}
        style={{ width: "700px", height: "600px", position: "absolute" }}
      >
        <Popover
          width={400}
          position="bottom"
          withArrow={state.context.guideTarget.withArrow}
          shadow="md"
          opened={displayGuide}
        >
          <Popover.Target>
            <div
              style={{
                position: "absolute",
                width: "100px",
                height: "100px",
                left: state.context.guideTarget.x,
                top: state.context.guideTarget.y,
              }}
            />
          </Popover.Target>
          <Popover.Dropdown
            onClick={() => {
              send("GUIDE_CLOSED")
            }}
          >
            <>
              <p>{getGuideCopy(state.context.currentGuide)}</p>
              <p>Click this guide to close.</p>
            </>
          </Popover.Dropdown>
        </Popover>
      </div>

      {isGameOver ? (
        <>
          <h2>Game over man! No vacuum organims left!</h2>
        </>
      ) : (
        <>
          <CountdownBar scaleX={state.context.countdown} />
          <div
            ref={boardContainer}
            style={{ width: "700px", height: "600px", position: "relative" }}
          >
            {tiles.map(({ id, x, y }) => (
              <Tile key={id} x={x} y={y} label={id} />
            ))}
            {vorgs.map(({ id, x, y, type, health }) => {
              return (
                <Vorg
                  key={id}
                  x={x}
                  y={y}
                  label={type}
                  type={type}
                  health={health}
                  debug
                />
              )
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
      )}
    </>
  )
}
