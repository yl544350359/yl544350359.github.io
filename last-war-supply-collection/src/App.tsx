import React, {useState, useMemo} from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'
import Konva from 'konva'
import { useGesture } from '@use-gesture/react'
import useLocalStorage from './useLocalStorage'
import InfoPanel from './InfoPanel'
import {SUPPLY_DATA, buildSupplyMap, LEVEL_COLORS} from './data'

interface CoordTpe {
  // coordinate in game map
  x: number,
  y: number,
  // position in stage
  pos: {
    x: number,
    y: number
  }
}

const RECT_WIDTH = 20
const RECT_HEIGHT = 20
function App() {
  const [viewport, setViewport] = useState({ x: 0, y: 0, scale: 1 })
  const [selectedCoord, setSelectedCoord] = useState<CoordTpe|null>(null)
  const [collected, setCollected] = useLocalStorage<Set<string>>('collected', new Set())
  const [infoOpen, setInfoOpen] = useState(true)

  const SUPPLY_MAP = useMemo(buildSupplyMap, [])

  const bind = useGesture({
    onDrag: ({ delta: [dx, dy] }) => {
      setViewport(v => ({
        ...v,
        x: v.x + dx,
        y: v.y + dy
      }))
    },
    onPinch: ({ origin: [ox, oy], movement: [ms], event }) => {
      event.preventDefault();
      const newScale = Math.min(1, Math.max(0.1, viewport.scale * ms));
      setViewport(v => ({
        ...v,
        scale: newScale
      }))
    },
    onWheel: ({ delta: [, dy] }) => {
      const newScale = Math.min(1, Math.max(0.1, viewport.scale * (1 + dy * 0.01)))
      setViewport(v => ({ ...v, scale: newScale }))
    }
  })

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage()!
    const pos = stage.getPointerPosition()!
    const x = Math.floor((pos.x - viewport.x) / (RECT_WIDTH * viewport.scale))
    const y = Math.floor((pos.y - viewport.y) / (RECT_HEIGHT * viewport.scale))
    
    if (x >= 0 && x < 1000 && y >= 0 && y < 1000) {
      setSelectedCoord({ x: x, y: y, pos: pos })
    }
  }

  const stats = useMemo(() => {
    const total = new Map<number, number>()
    const collectedCount = new Map<number, number>()
    
    Object.entries(SUPPLY_DATA).forEach(([level, coords]) => {
      const lv = parseInt(level);
      total.set(lv, coords.length)
      collectedCount.set(lv, 0)
    });

    collected.forEach(coord => {
      const lv = SUPPLY_MAP.get(coord)
      if (lv) collectedCount.set(lv, collectedCount.get(lv)??0 +1)
    })

    return { total, collectedCount }
  }, [collected])

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="absolute top-6 right-6 z-10">
        <InfoPanel 
          stats={stats} 
          isOpen={infoOpen} 
          toggleOpen={() => setInfoOpen(!infoOpen)}
        />
      </div>
      <Stage
        {...bind() as React.ComponentProps<typeof Stage>}
        width={window.innerWidth}
        height={window.innerHeight}
        x={viewport.x}
        y={viewport.y}
        scaleX={viewport.scale}
        scaleY={viewport.scale}
        onClick={handleStageClick}
        draggable
      >
        <Layer>
        {Array.from({ length: 10 }, (_, x) => (
            Array.from({ length: 10 }, (_, y) => {
              const key = `${x},${y}`
              // const level = SUPPLY_MAP.get(key) ?? 0
              // const isCollected = collected.has(key)
              
              return <Rect
                  key={key}
                  x={x * RECT_WIDTH}
                  y={y * RECT_HEIGHT}
                  width={RECT_WIDTH}
                  height={RECT_HEIGHT}
                  // fill={isCollected ? '#00FF00' : LEVEL_COLORS[level]}
                  fill ='#00FF00'
                  stroke="black"
                  strokeWidth={1}
                />
            })
          ))}
        </Layer>
        </Stage>
    </div>
  );
}

export default App;
