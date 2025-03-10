import React, {useState, useMemo} from 'react'
import useLocalStorage from './useLocalStorage'
import InfoPanel from './InfoPanel'
import {SUPPLY_DATA, supplyMap, LEVEL_COLORS} from './data'

function App() {
  const [viewport, setViewport] = useState({ x: 0, y: 0, scale: 0.1 })
  const [collected, setCollected] = useLocalStorage<Set<string>>('collected', new Set())
  const [infoOpen, setInfoOpen] = useState(true)

  const stats = useMemo(() => {
    const total = new Map<number, number>()
    const collectedCount = new Map<number, number>()
    
    Object.entries(SUPPLY_DATA).forEach(([level, coords]) => {
      const lv = parseInt(level);
      total.set(lv, coords.length)
      collectedCount.set(lv, 0)
    });

    collected.forEach(coord => {
      const lv = supplyMap().get(coord)
      if (lv) collectedCount.set(lv, collectedCount.get(lv)??0 +1)
    })

    return { total, collectedCount }
  }, [collected])

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 z-10">
        <InfoPanel 
          stats={stats} 
          isOpen={infoOpen} 
          toggleOpen={() => setInfoOpen(!infoOpen)}
        />
      </div>
        <div className="text-lg text-red font-bold underline">
          Hello world!
        </div>
    </div>
  );
}

export default App;
