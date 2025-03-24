// level -> index
const LEVEL_1_0 = [[0, 240], [1, 129], [1, 601], [10, 134], [14, 386], [14, 726], [18, 144], [18, 916], [2, 237], [2, 284], [2, 290], [20, 267], [22, 280], [23, 414], [25, 554], [25, 702], [29, 232], [29, 90], [3, 110], [30, 278], [31, 139], [31, 386], [33, 555], [33, 761], [34, 118], [34, 417], [34, 907], [35, 245], [35, 279], [35, 702], [36, 390], [36, 722], [37, 253], [39, 418], [4, 90], [41, 748], [42, 850], [43, 397], [43, 918], [45, 443], [45, 83], [49, 296], [5, 117], [56, 125], [57, 100], [57, 381], [57, 899], [57, 915], [59, 280], [60, 599], [60, 736], [61, 383], [63, 263], [63, 391], [64, 611], [64, 717], [66, 706], [67, 294], [68, 391], [68, 445], [68, 614], [68, 710], [7, 129], [70, 294], [72, 443], [73, 270], [74, 129], [74, 142], [77, 31], [8, 762], [81, 46], [83, 998], [9, 423], [93, 53], [96, 49], [97, 70], [47, 430], [68, 578], [3, 591], [54, 869], [59, 887], [68, 889], [41, 889], [33, 877], [10, 856], [8, 883], [60, 888], [7, 606], [48, 620], [69, 573], [56, 559], [22, 733], [40, 752], [71, 755], [22, 732], [41, 395], [63, 418], [55, 237], [57, 260], [80, 964], [41, 754], [18, 733], [57, 887], [55, 871], [59, 899]]
const LEVEL_1_1 = [[105, 999], [109, 988], [112, 949], [113, 4], [122, 942], [125, 961], [127, 983], [135, 931], [136, 66], [148, 952], [101, 945], [105, 956], [103, 923], [120, 951], [138, 997], [147, 963], [104, 923], [101, 944], [120, 950]]
const LEVLE_1_2 = [[232, 74], [256, 957], [282, 996], [287, 989], [297, 985], [231, 952], [245, 973], [252, 936], [259, 935], [253, 4]]
const LEVEL_1_3 = [[387, 0], [392, 9], [396, 60]]
const LEVEL_1_4 = [[401, 46], [431, 0], [435, 11], [440, 1], [442, 5], [415, 58], [433, 40]]
const LEVEL_1_5 = [[512, 299], [554, 26], [554, 48], [559, 31], [565, 998], [574, 74], [576, 69], [579, 1], [595, 55], [596, 59], [555, 61], [597, 31]]
const LEVEL_1_6 = [[603, 10], [603, 37], [614, 24], [608, 54], [614, 39]]
const LEVEL_1_7 = [[700, 13], [704, 977], [715, 30], [740, 998], [743, 960], [755, 928], [757, 59], [762, 994], [764, 979], [768, 986], [773, 1], [732, 42], [733, 46]]
const LEVEL_1_8 = [[852, 959], [855, 976], [867, 931], [867, 975], [869, 945], [874, 938], [888, 69], [896, 951], [898, 981], [859, 936], [871, 972]]
const LEVEL_1_9 = [[900, 942], [902, 991], [907, 972], [923, 986], [925, 289], [925, 80], [929, 125], [930, 245], [930, 774], [931, 256], [933, 904], [934, 922], [935, 245], [935, 921], [937, 258], [937, 96], [939, 617], [941, 299], [942, 289], [944, 858], [944, 904], [948, 131], [948, 294], [949, 918], [951, 284], [951, 568], [952, 563], [953, 900], [954, 385], [956, 246], [958, 135], [958, 899], [959, 895], [961, 256], [964, 400], [964, 920], [969, 282], [970, 248], [971, 858], [978, 437], [982, 80], [987, 862], [988, 296], [991, 282], [992, 272], [994, 279], [999, 121], [990, 754], [976, 870], [921, 21], [910, 957], [948, 427], [945, 416], [965, 442], [941, 571], [939, 560]]
export const SUPPLY_DATA = {
    1: [...LEVEL_1_0, ...LEVEL_1_1, ...LEVLE_1_2, ...LEVEL_1_3, ...LEVEL_1_4, ...LEVEL_1_5, ...LEVEL_1_6, ...LEVEL_1_7, ...LEVEL_1_8, ...LEVEL_1_9],
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
    0: '#F8FAFC',
    1: '#BAE6FD',
    2: '#E9D5FF',
    3: '#FEF08A',
    4: '#FDBA74',
    5: '#0EA5E9',
    6: '#A855F7',
    7: '#EF4444'
  }