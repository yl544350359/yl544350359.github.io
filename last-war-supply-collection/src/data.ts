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
const LEVEL_2_0 = [[76, 205], [77, 839], [81, 480], [83, 543], [85, 161], [85, 305], [86, 779], [87, 170], [90, 334], [91, 194], [92, 507], [94, 528], [94, 668], [97, 783]]
const LEVEL_2_1 = [[100, 367], [101, 533], [101, 297], [102, 185], [107, 318], [108, 308], [109, 648], [110, 303], [113, 464], [113, 841], [115, 182], [116, 304], [119, 685], [120, 678], [121, 168], [122, 697], [122, 823], [124, 842], [125, 153], [125, 791], [127, 679], [130, 541], [131, 209], [132, 463], [133, 353], [137, 168], [138, 208], [139, 373], [141, 815], [142, 188], [142, 538], [143, 202], [143, 800], [146, 209], [146, 519], [146, 802], [147, 543], [149, 458], [155, 292], [168, 112], [168, 88], [172, 134], [174, 104], [180, 873], [186, 103], [192, 129], [192, 915], [195, 922], [197, 863]]
const LEVEL_2_2 = [[201, 892], [202, 856], [208, 142], [209, 876], [212, 91], [216, 850], [219, 110], [219, 902], [220, 105], [220, 888], [221, 130], [222, 916], [299, 931]]
const LEVEL_2_3 = [[300, 893], [302, 146], [304, 88], [311, 111], [314, 131], [315, 141], [317, 917], [327, 908], [330, 98], [332, 75], [342, 78], [349, 850], [351, 917], [357, 904], [367, 889], [368, 877], [368, 147], [371, 855], [373, 118], [373, 886], [373, 886]]
const LEVEL_2_4 = [[472, 916], [478, 917], [484, 93], [491, 112], [496, 77]]
const LEVEL_2_5 = [[500, 121], [505, 130], [507, 109], [513, 121], [518, 122], [519, 140], [521, 97], [527, 116], [530, 904], [537, 113], [539, 889], [545, 864], [546, 102]]
const LEVEL_2_6 = [[631, 894], [633, 149], [639, 88], [641, 876], [644, 884], [646, 134], [653, 893], [666, 101], [666, 879], [667, 142], [668, 881], [669, 139], [670, 871], [682, 105], [685, 79], [686, 905], [687, 142], [692, 862], [695, 902]]
const LEVEL_2_7 = [[776, 76], [776, 905], [777, 891], [780, 872], [784, 149], [785, 903], [786, 891], [788, 117], [789, 894], [793, 123], [793, 82], [795, 79], [797, 144]]
const LEVEL_2_8 = [[801, 864], [803, 916], [807, 93], [809, 859], [812, 871], [822, 123], [828, 135], [830, 85], [832, 100], [839, 875], [843, 862], [846, 891], [850, 798], [851, 837], [853, 530], [855, 197], [857, 177], [860, 319], [863, 155], [864, 193], [864, 540], [865, 360], [866, 472], [867, 320], [869, 325], [870, 209], [871, 533], [872, 215], [873, 339], [874, 494], [876, 687], [879, 635], [880, 171], [880, 197], [881, 838], [884, 515], [885, 204], [888, 176], [888, 784], [895, 490], [897, 841], [899, 849]]
const LEVEL_2_9 = [[901, 515], [902, 317], [902, 663], [905, 369], [905, 454], [907, 199], [909, 628], [910, 797], [910, 687], [911, 826], [912, 665], [915, 367], [916, 650], [917, 842], [917, 639], [919, 459], [919, 835], [920, 176], [922, 533], [923, 310]]
const LEVEL_3_1 = [[150, 431], [150, 588], [152, 249], [157, 739], [159, 730], [169, 273], [169, 594], [178, 445], [181, 237], [183, 619], [191, 278], [193, 600], [196, 238], [196, 566], [198, 445]]
const LEVEL_3_2 = [[202, 701], [205, 709], [213, 424], [213, 424], [214, 265], [218, 423], [223, 581], [226, 846], [239, 793], [249, 849], [250, 844], [255, 198], [255, 224], [255, 814], [256, 212], [260, 777], [264, 158], [269, 823], [272, 177], [278, 787], [279, 224], [281, 839], [285, 194]]
const LEVEL_3_3 = [[384, 849], [385, 156], [391, 168], [393, 203], [393, 190]]
const LEVEL_3_4 = [[412, 845], [420, 180], [422, 223], [431, 222], [435, 180], [448, 844]]
const LEVEL_3_5 = [[551, 165], [555, 831], [556, 190], [564, 206], [569, 795], [576, 786], [577, 783], [578, 194], [584, 821], [588, 832], [593, 222], [595, 846]]
const LEVEL_3_6 = [[613, 806], [624, 816]]
const LEVEL_3_7 = [[701, 793], [704, 803], [712, 809], [742, 163], [759, 838], [759, 159], [761, 828], [761, 163], [767, 785], [768, 797], [769, 211], [770, 715], [771, 196], [775, 561], [776, 732], [778, 436], [779, 391], [780, 376], [782, 263], [791, 715]]
const LEVEL_3_8 = [[800, 433], [804, 378], [804, 583], [809, 248], [816, 616], [821, 550], [823, 726], [827, 376], [829, 701], [832, 723], [833, 248], [833, 601], [838, 559], [839, 718], [842, 388], [843, 269], [845, 258], [847, 748]]
const LEVEL_4_2 = [[227, 465], [234, 548], [236, 305], [237, 361], [237, 308], [238, 518], [251, 318], [255, 679], [260, 324], [261, 635], [262, 536], [263, 646], [265, 312], [283, 503], [283, 334], [285, 366], [288, 642], [289, 368], [290, 660], [293, 323], [296, 647], [298, 367], [298, 532]]
const LEVEL_4_3 = [[300, 533], [309, 276], [312, 705], [316, 751], [317, 266], [337, 255], [346, 281], [350, 252], [372, 296], [375, 279]]
const lEVEL_4_4 = [[450, 282], [456, 727], [459, 719], [472, 722], [486, 702], [487, 724], [488, 726], [495, 707]]
const LEVEL_4_5 = [[524, 722], [533, 229], [539, 269], [541, 245], [546, 255], [547, 741], [548, 766]]
const LEVEL_4_6 = [[631, 761], [644, 288], [647, 292], [657, 757], [660, 729], [662, 762], [665, 741], [666, 286], [667, 707], [669, 230], [680, 239], [684, 698], [689, 277]]
const LEVEL_4_7 = [[701, 460], [708, 487], [709, 651], [709, 463], [713, 454], [717, 636], [722, 683], [737, 372], [738, 507], [739, 460], [742, 638], [748, 495], [758, 303], [760, 697], [760, 538], [766, 371], [769, 354], [770, 691], [770, 330], [774, 506]]
const LEVEL_5_3 = [[308, 585],[324,390],[325,426],[339,435],[363, 576],[367,431],[372,568],[396,691]]
const LEVEL_5_4 = [[428,695],[428,365],[432, 651],[441,351]]
const LEVEL_5_5 = [[579, 320]]
const LEVEL_5_6 = [[603, 659],[634, 615],[678, 614],[686, 598]]

export const SUPPLY_DATA = {
  1: [
    ...LEVEL_1_0,
    ...LEVEL_1_1,
    ...LEVLE_1_2,
    ...LEVEL_1_3,
    ...LEVEL_1_4,
    ...LEVEL_1_5,
    ...LEVEL_1_6,
    ...LEVEL_1_7,
    ...LEVEL_1_8,
    ...LEVEL_1_9,
  ],
  2: [
    ...LEVEL_2_0,
    ...LEVEL_2_1,
    ...LEVEL_2_2,
    ...LEVEL_2_3,
    ...LEVEL_2_4,
    ...LEVEL_2_5,
    ...LEVEL_2_6,
    ...LEVEL_2_7,
    ...LEVEL_2_8,
    ...LEVEL_2_9,
  ],
  3: [
    ...LEVEL_3_1,
    ...LEVEL_3_2,
    ...LEVEL_3_3,
    ...LEVEL_3_4,
    ...LEVEL_3_5,
    ...LEVEL_3_6,
    ...LEVEL_3_7,
    ...LEVEL_3_8,
  ],
  4: [
    ...LEVEL_4_2,
    ...LEVEL_4_3,
    ...lEVEL_4_4,
    ...LEVEL_4_5,
    ...LEVEL_4_6,
    ...LEVEL_4_7,
  ],
  5: [...LEVEL_5_3, ...LEVEL_5_4, ...LEVEL_5_5, ...LEVEL_5_6],
  6: [[382, 451]],
  7: [[463, 462]],
};

// index -> level
export const buildSupplyMap = () => {
  const map = new Map<string, number>();
  Object.entries(SUPPLY_DATA).forEach(([level, coords]) => {
    const lv = parseInt(level);
    coords.forEach(([x, y]) => map.set(`${x},${y}`, lv));
  });
  return map;
};

export const LEVEL_COLORS: { [key: number]: string } = {
  0: "#F8FAFC",
  1: "#BAE6FD",
  2: "#E9D5FF",
  3: "#FEF08A",
  4: "#FDBA74",
  5: "#0EA5E9",
  6: "#A855F7",
  7: "#EF4444",
};
