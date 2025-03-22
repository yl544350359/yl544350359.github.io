import React from "react"
import { SUPPLY_DATA, LEVEL_COLORS } from "./data"

export function getCurrentColor(x:number, y:number, lodLevel:number, supplyMap: Map<string, number>) {
    if (lodLevel===0) {
        const key = `${x},${y}`
        return supplyMap.has(key)? LEVEL_COLORS[supplyMap.get(key) as number] : LEVEL_COLORS[0]
    }
    // const currentRectWidth = Math.pow(5, lodLevel)
    return LEVEL_COLORS[0]
}

export function getBorderSize(lodLevel: number) {
    switch(lodLevel) {
        case 0:
            return 1
        case 1:
            return 5
        case 2:
            return 25
        case 3:
            return 125
        default:
            return 1
    }
}