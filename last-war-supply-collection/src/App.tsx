import React, {useState, useMemo, useEffect, useRef, useCallback} from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import Konva from 'konva'
import Hammer from 'hammerjs'
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

const RECT_WIDTH = 50
const RECT_HEIGHT = 50
const totalRows = 100
const totalCols = 100

function App() {
  const [viewport, setViewport] = useState({ x: 0, y: 0, scale: 1 })
  // const [visibleRects, setVisibleRects] = useState<{ x: number; y: number }[]>([])
  const [selectedCoord, setSelectedCoord] = useState<CoordTpe|null>(null)
  const [collected, setCollected] = useLocalStorage<Set<string>>('collected', new Set())
  const [infoOpen, setInfoOpen] = useState(true)
  const stageRef = useRef<Konva.Stage>(null)

  const SUPPLY_MAP = useMemo(buildSupplyMap, [])

  const handleWheel = (e:Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault()
    const scaleBy = 1.1
    const stage = e.target.getStage()!
    const newScale = e.evt.deltaY < 0 ? viewport.scale * scaleBy : viewport.scale / scaleBy
    const mousePointTo = {
      x: stage.getPointerPosition()!.x / viewport.scale - stage.x() / viewport.scale,
      y: stage.getPointerPosition()!.y / viewport.scale - stage.y() / viewport.scale
    }
    setViewport({
      scale: newScale,
      x: -(mousePointTo.x - stage!.getPointerPosition()!.x / newScale) * newScale,
      y: -(mousePointTo.y - stage!.getPointerPosition()!.y / newScale) * newScale
    })
  }

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage()!
    const pos = stage.getPointerPosition()!
    const x = Math.floor((pos.x - viewport.x) / (RECT_WIDTH * viewport.scale))
    const y = Math.floor((pos.y - viewport.y) / (RECT_HEIGHT * viewport.scale))
    if (x >= 0 && x < 1000 && y >= 0 && y < 1000) {
      setSelectedCoord({ x: 999 - x, y: 999 - y, pos: pos })
    }
  }

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const stage = e.target.getStage()!
    const x = stage.x()
    const y = stage.y()
    setViewport({ ...viewport,x: x, y: y })
  }

  const throttle = (func: Function, delay: number) => {
    let inThrottle: boolean = false
    return function(...args: any[]) {
      if (!inThrottle) {
        func(...args)
        inThrottle = true;
        setTimeout(() => inThrottle = false, delay);
      }
    };
  };

  const visibleRects = useMemo(() => {
    // const stage = stageRef.current
    // if (!stage) return []

    const startCol = Math.floor(-viewport.x/RECT_WIDTH*viewport.scale)
    const endCol = Math.ceil((window.innerWidth-viewport.x)/RECT_WIDTH*viewport.scale)

    const startRow = Math.floor(-viewport.y/RECT_HEIGHT*viewport.scale)
    const endRow = Math.ceil((window.innerWidth-viewport.y)/RECT_HEIGHT*viewport.scale)
    const limitedStartCol = Math.max(0, startCol)
    const limitedEndCol = Math.min(totalCols -1, endCol)

    const limitedStartRow = Math.max(0, startRow)
    const limitedEndRow = Math.min(totalRows-1, endRow)
    const rects=[]
    for(let row = limitedStartRow; row<=limitedEndRow;row++) {
      for(let col = limitedStartCol; col<=limitedEndCol;col++) {
        rects.push({
          x: col * RECT_WIDTH,
          y: row * RECT_HEIGHT
        })
      }
    }
    return rects
  },[viewport])

  useEffect(() => {
    const stage = stageRef.current!.getStage()
    const hammer = new Hammer(stage.content)
    hammer.get('pinch').set({ enable: true })
    hammer.on('pinchmove', (e) => {
      e.preventDefault()

      const scale = viewport.scale * e.scale;
      setViewport((prev) => ({
        ...prev,
        scale,
      }))
    })

    return () => {
      hammer.destroy()
    }
  },[viewport.scale])

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
  console.log(visibleRects.length)
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="absolute top-6 right-6 z-10">
        <InfoPanel 
          stats={stats} 
          isOpen={infoOpen} 
          toggleOpen={() => setInfoOpen(!infoOpen)}
        />
      </div>
      <div className='fixed bottom-6 z-10 left-1/2 -translate-x-8 bg-white rounded p-3'>{`(${selectedCoord?.x ?? '-'},${selectedCoord?.y ?? '-'}) pos(${selectedCoord?.pos.x ?? '-'},${selectedCoord?.pos.y ?? '-'})`}</div>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onWheel={handleWheel}
        x={viewport.x}
        y={viewport.y}
        scaleX={viewport.scale}
        scaleY={viewport.scale}
        onClick={handleStageClick}
        onDragEnd={handleDragEnd}
        draggable
      >
        <Layer cache>
          {visibleRects.map((rect, index) => {
            return <Rect 
              key={index}
              x={rect.x}
              y={rect.y}
              width={RECT_WIDTH}
              height={RECT_HEIGHT}
              fill='#00FF00'
              stroke="black"
              strokeWidth={1}
            />
          })}
        </Layer>
        </Stage>
    </div>
  );
}

export default App;
