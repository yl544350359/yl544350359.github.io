import React, {useState, useMemo, useEffect, useRef, useCallback} from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import Konva from 'konva'
import Hammer from 'hammerjs'
import useLocalStorage from './useLocalStorage'
import InfoPanel from './InfoPanel'
import {SUPPLY_DATA, buildSupplyMap, LEVEL_COLORS} from './data'
import {getCurrentColor, getBorderSize, precomputeLODMap } from './utilities'

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
const totalRows = 1000
const totalCols = 1000
const MAX_LOD_LEVEL = 3

function App() {
  const [viewport, setViewport] = useState({ x: 0, y: 0, scale: 1 })
  const [selectedCoord, setSelectedCoord] = useState<CoordTpe|null>(null)
  const [collected, setCollected] = useLocalStorage<Set<string>>('collected', new Set())
  const [infoOpen, setInfoOpen] = useState(true)
  const stageRef = useRef<Konva.Stage>(null)

  const cache = useMemo(()=>{
    const totalMap = new Map<number, Map<string,number>>()
    const level0Map = buildSupplyMap()
    totalMap.set(0, level0Map)
    const level1Map = precomputeLODMap(1, level0Map)
    totalMap.set(1, level1Map)
    const level2Map = precomputeLODMap(2, level1Map)
    totalMap.set(2, level2Map)
    const level3Map = precomputeLODMap(3, level2Map)
    totalMap.set(3, level3Map)
    return totalMap
  }, [])

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

  const calculateLodLevel = (scale: number)=>{
    if(scale>0.2) return 0;
    let level = 0
    let threshold = 0.2

    while(scale<threshold && level<MAX_LOD_LEVEL) {
      level++
      threshold/=5
    }
    return level
  }

  const visibleRects = useMemo(() => {
    const lodLevel = calculateLodLevel(viewport.scale)
    const currentRectWidth = RECT_WIDTH*Math.pow(5, lodLevel)
    const currentRectHeight = RECT_HEIGHT*Math.pow(5, lodLevel)
    const lodMapWidth = Math.ceil(totalCols/Math.pow(5, lodLevel))
    const lodMapHeight = Math.ceil(totalRows/Math.pow(5, lodLevel))
    
    const startCol = Math.floor(-viewport.x/currentRectWidth*viewport.scale)
    const endCol = Math.ceil((window.innerWidth-viewport.x)/(currentRectWidth*viewport.scale))
    const startRow = Math.floor(-viewport.y/currentRectHeight*viewport.scale)
    const endRow = Math.ceil((window.innerHeight-viewport.y)/(currentRectHeight*viewport.scale))
    const limitedStartCol = Math.max(0, startCol)
    const limitedEndCol = Math.min(lodMapWidth -1, endCol)

    const limitedStartRow = Math.max(0, startRow)
    const limitedEndRow = Math.min(lodMapHeight-1, endRow)
    const rects=[]
    for(let row = limitedStartRow; row<=limitedEndRow;row++) {
      for(let col = limitedStartCol; col<=limitedEndCol;col++) {
        rects.push({
          x: col * currentRectWidth,
          y: row * currentRectHeight,
          currentWidth:currentRectWidth,
          currentHeight: currentRectHeight,
          color: getCurrentColor(col,row, lodLevel, cache),
          lodLevel: lodLevel
        })
      }
    }
    return rects
  },[viewport.x, viewport.y, viewport.scale])

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
      const lv = cache.get(0)!.get(coord)
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
              width={rect.currentWidth}
              height={rect.currentHeight}
              fill={rect.color}
              stroke="black"
              strokeWidth={getBorderSize(rect.lodLevel)}
            />
          })}
        </Layer>
        </Stage>
    </div>
  );
}

export default App;
