import React from "react";
import { SUPPLY_DATA, LEVEL_COLORS } from "./data";

export function getCurrentColor(
  x: number,
  y: number,
  lodLevel: number,
  cache: Map<number, Map<string, number>>,
) {
  const realX =
    lodLevel === 0 ? 999 - x : 1000 - (x + 1) * Math.pow(5, lodLevel);
  const realY =
    lodLevel === 0 ? 999 - y : 1000 - (y + 1) * Math.pow(5, lodLevel);
  const key = `${realX},${realY}`;
  return cache.get(lodLevel)!.has(key)
    ? LEVEL_COLORS[cache.get(lodLevel)!.get(key) as number]
    : LEVEL_COLORS[0];
}

export function precomputeLODMap(
  lodLevel: number,
  supplyMap: Map<string, number>,
) {
  const currentLodCache = new Map<string, number>();
  for (let i = 0; i < 1000; i += 5) {
    for (let j = 0; j < 1000; j += 5) {
      let currentMaxLevel = 0;
      for (let m = 0; m < 5; m++) {
        for (let n = 0; n < 5; n++) {
          const key = `${i + m},${j + n}`;
          currentMaxLevel = Math.max(
            currentMaxLevel,
            supplyMap.has(key) ? (supplyMap.get(key) as number) : 0,
          );
        }
      }
      if (currentMaxLevel > 0) {
        currentLodCache.set(`${i},${j}`, currentMaxLevel);
      }
    }
  }
  return currentLodCache;
}

export function getBorderSize(lodLevel: number) {
  switch (lodLevel) {
    case 0:
      return 1;
    case 1:
      return 5;
    case 2:
      return 25;
    case 3:
      return 125;
    default:
      return 1;
  }
}
