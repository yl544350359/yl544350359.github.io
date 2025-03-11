// level -> index
export const SUPPLY_DATA = {
    1: [[774,940],[8,762]],
    2: [[121,848],[149, 458]],
    3: [[808,248]],
    4: [[287,368]],
    5: [[350,609]],
    6: [[382,451]],
    7: [[463,462]]
}

// index -> level
export const buildSupplyMap = () => {
    const map = new Map<string, number>();
    Object.entries(SUPPLY_DATA).forEach(([level, coords]) => {
      const lv = parseInt(level);
      coords.forEach(([x, y]) => map.set(`${x},${y}`, lv));
    });
    return map;
}

export const LEVEL_COLORS: {[key: number]: string} = {
    0: '#E5E5E5',
    1: '#FFB3BA',
    2: '#FFDFBA',
    3: '#FFFFBA',
    4: '#BAFFC9',
    5: '#BAE1FF',
    6: '#D0BAFF',
    7: '#FFBAF1'
  }