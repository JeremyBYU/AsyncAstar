import ndarray from 'ndarray';

export interface MazeTest {
  name: string; // name of test to display
  maze: string; // name of maze
  start: [number, number, number];
  goal: [number, number, number];
  allowDiag?: boolean;
  heuristic: string;
  expectedPath: number[][];
}

export const MAZES = [
  {
    name: 'small_maze',
    file: 'small_maze.png'
  },
  {
    name: 'medium_maze',
    file: 'medium_maze.png'
  },
  // {
  //   name: 'large_maze',
  //   file: 'large_maze.png'
  // },
  {
    name: 'small_obstacle',
    file: 'small_obstacle.png'
  },
  {
    name: 'small_empty',
    file: 'small_empty.png'
  },
  {
    name: '3D_empty_small',
    data: ndarray(
      new Uint8Array([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]),
      [3, 3, 3]
    ),
    is3D: true
  }
];


export const MAZE_BENCHMARKS = [
  {
    name: 'Medium - Maze',
    maze: 'medium_maze',
    heuristic: 'euclidean',
    start: [392, 0, 0],
    goal: [408, 799, 0],
    allowDiag: true,
    expectedPath:  [[73, 0, 0], [73, 1, 0], [73, 2, 0], [73, 3, 0], [73, 4, 0], [73, 5, 0], [73, 6, 0], [72, 7, 0], [71, 8, 0], [70, 8, 0], [69, 8, 0], [68, 8, 0], [67, 8, 0], [66, 8, 0], [65, 8, 0], [64, 8, 0], [63, 8, 0], [62, 9, 0], [61, 9, 0], [60, 9, 0], [59, 9, 0], [58, 9, 0], [57, 10, 0], [57, 11, 0], [57, 12, 0], [57, 13, 0], [57, 14, 0], [57, 15, 0], [57, 16, 0], [57, 17, 0], [57, 18, 0], [57, 19, 0], [57, 20, 0], [57, 21, 0], [57, 22, 0], [57, 23, 0], [58, 24, 0], [59, 25, 0], [60, 25, 0], [61, 25, 0], [62, 25, 0], [63, 25, 0], [64, 25, 0], [65, 25, 0], [66, 25, 0], [67, 25, 0], [68, 25, 0], [69, 25, 0], [70, 25, 0], [71, 25, 0], [72, 25, 0], [73, 25, 0], [74, 25, 0], [75, 25, 0], [76, 25, 0], [77, 25, 0], [78, 25, 0], [79, 25, 0], [80, 25, 0], [81, 25, 0], [82, 25, 0], [83, 25, 0], [84, 25, 0], [85, 25, 0], [86, 25, 0], [87, 25, 0], [88, 26, 0], [88, 27, 0], [88, 28, 0], [88, 29, 0], [88, 30, 0], [88, 31, 0], [88, 32, 0], [88, 33, 0], [88, 34, 0], [88, 35, 0], [88, 36, 0], [88, 37, 0], [88, 38, 0], [88, 39, 0], [88, 40, 0], [88, 41, 0], [88, 42, 0], [88, 43, 0], [88, 44, 0], [88, 45, 0], [88, 46, 0], [88, 47, 0], [88, 48, 0], [88, 49, 0], [88, 50, 0], [88, 51, 0], [88, 52, 0], [88, 53, 0], [88, 54, 0], [89, 55, 0], [90, 56, 0], [91, 57, 0], [92, 57, 0], [93, 57, 0], [94, 57, 0], [95, 57, 0], [96, 57, 0], [97, 57, 0], [98, 57, 0], [99, 57, 0], [100, 57, 0], [101, 57, 0], [102, 57, 0], [103, 57, 0], [104, 58, 0], [104, 59, 0], [104, 60, 0], [104, 61, 0], [104, 62, 0], [104, 63, 0], [104, 64, 0], [104, 65, 0], [104, 66, 0], [104, 67, 0], [104, 68, 0], [104, 69, 0], [104, 70, 0], [104, 71, 0], [103, 72, 0], [102, 73, 0], [101, 73, 0], [100, 73, 0], [99, 73, 0], [98, 73, 0], [97, 73, 0], [96, 73, 0], [95, 73, 0], [94, 73, 0], [93, 73, 0], [92, 73, 0], [91, 73, 0], [90, 73, 0], [89, 74, 0], [89, 75, 0], [89, 76, 0], [89, 77, 0], [89, 78, 0], [89, 79, 0], [89, 80, 0], [89, 81, 0], [89, 82, 0], [89, 83, 0], [89, 84, 0], [89, 85, 0], [89, 86, 0], [89, 87, 0], [90, 88, 0], [91, 88, 0], [92, 88, 0], [93, 88, 0], [94, 88, 0], [95, 88, 0], [96, 88, 0], [97, 88, 0], [98, 88, 0], [99, 88, 0], [100, 88, 0], [101, 88, 0], [102, 88, 0], [103, 88, 0], [104, 88, 0], [105, 88, 0], [106, 88, 0], [107, 88, 0], [108, 88, 0], [109, 88, 0], [110, 88, 0], [111, 88, 0], [112, 88, 0], [113, 88, 0], [114, 88, 0], [115, 88, 0], [116, 88, 0], [117, 88, 0], [118, 88, 0], [119, 88, 0], [120, 88, 0], [121, 88, 0], [122, 88, 0], [123, 88, 0], [124, 88, 0], [125, 88, 0], [126, 88, 0], [127, 88, 0], [128, 88, 0], [129, 88, 0], [130, 88, 0], [131, 88, 0], [132, 88, 0], [133, 88, 0], [134, 88, 0], [135, 88, 0], [136, 87, 0], [136, 86, 0], [136, 85, 0], [136, 84, 0], [136, 83, 0], [136, 82, 0], [136, 81, 0], [136, 80, 0], [136, 79, 0], [136, 78, 0], [136, 77, 0], [136, 76, 0], [136, 75, 0], [136, 74, 0], [135, 73, 0], [134, 73, 0], [133, 73, 0], [132, 73, 0], [131, 73, 0], [130, 73, 0], [129, 73, 0], [128, 73, 0], [127, 73, 0], [126, 73, 0], [125, 73, 0], [124, 73, 0], [123, 73, 0], [122, 72, 0], [121, 71, 0], [121, 70, 0], [121, 69, 0], [121, 68, 0], [121, 67, 0], [121, 66, 0], [121, 65, 0], [121, 64, 0], [121, 63, 0], [121, 62, 0], [121, 61, 0], [121, 60, 0], [121, 59, 0], [121, 58, 0], [122, 57, 0], [123, 57, 0], [124, 57, 0], [125, 57, 0], [126, 57, 0], [127, 57, 0], [128, 57, 0], [129, 57, 0], [130, 57, 0], [131, 57, 0], [132, 57, 0], [133, 57, 0], [134, 57, 0], [135, 56, 0], [136, 55, 0], [136, 54, 0], [136, 53, 0], [136, 52, 0], [136, 51, 0], [136, 50, 0], [136, 49, 0], [136, 48, 0], [136, 47, 0], [136, 46, 0], [136, 45, 0], [136, 44, 0], [136, 43, 0], [136, 42, 0], [136, 41, 0], [136, 40, 0], [136, 39, 0], [136, 38, 0], [136, 37, 0], [136, 36, 0], [136, 35, 0], [136, 34, 0], [136, 33, 0], [136, 32, 0], [136, 31, 0], [136, 30, 0], [136, 29, 0], [136, 28, 0], [136, 27, 0], [136, 26, 0], [136, 25, 0], [136, 24, 0], [136, 23, 0], [136, 22, 0], [136, 21, 0], [136, 20, 0], [136, 19, 0], [136, 18, 0], [136, 17, 0], [136, 16, 0], [136, 15, 0], [136, 14, 0], [136, 13, 0], [136, 12, 0], [136, 11, 0], [137, 10, 0], [138, 9, 0], [139, 9, 0], [140, 9, 0], [141, 9, 0], [142, 9, 0], [143, 9, 0], [144, 9, 0], [145, 9, 0], [146, 9, 0], [147, 9, 0], [148, 9, 0], [149, 9, 0], [150, 9, 0], [151, 9, 0], [152, 10, 0], [152, 11, 0], [152, 12, 0], [152, 13, 0], [152, 14, 0], [152, 15, 0], [152, 16, 0], [152, 17, 0], [152, 18, 0], [152, 19, 0], [152, 20, 0], [152, 21, 0], [152, 22, 0], [152, 23, 0], [152, 24, 0], [152, 25, 0], [152, 26, 0], [152, 27, 0], [152, 28, 0], [152, 29, 0], [152, 30, 0], [152, 31, 0], [152, 32, 0], [152, 33, 0], [152, 34, 0], [152, 35, 0], [152, 36, 0], [152, 37, 0], [152, 38, 0], [152, 39, 0], [152, 40, 0], [152, 41, 0], [152, 42, 0], [152, 43, 0], [152, 44, 0], [152, 45, 0], [152, 46, 0], [152, 47, 0], [152, 48, 0], [152, 49, 0], [152, 50, 0], [152, 51, 0], [152, 52, 0], [152, 53, 0], [152, 54, 0], [152, 55, 0], [152, 56, 0], [152, 57, 0], [152, 58, 0], [152, 59, 0], [152, 60, 0], [152, 61, 0], [152, 62, 0], [152, 63, 0], [152, 64, 0], [152, 65, 0], [152, 66, 0], [152, 67, 0], [152, 68, 0], [152, 69, 0], [152, 70, 0], [152, 71, 0], [152, 72, 0], [152, 73, 0], [152, 74, 0], [152, 75, 0], [152, 76, 0], [152, 77, 0], [152, 78, 0], [152, 79, 0], [152, 80, 0], [152, 81, 0], [152, 82, 0], [152, 83, 0], [152, 84, 0], [152, 85, 0], [152, 86, 0], [152, 87, 0], [152, 88, 0], [152, 89, 0], [152, 90, 0], [152, 91, 0], [152, 92, 0], [152, 93, 0], [152, 94, 0], [152, 95, 0], [152, 96, 0], [152, 97, 0], [152, 98, 0], [152, 99, 0], [152, 100, 0], [152, 101, 0], [152, 102, 0], [152, 103, 0], [152, 104, 0], [152, 105, 0], [152, 106, 0], [152, 107, 0], [152, 108, 0], [152, 109, 0], [152, 110, 0], [152, 111, 0], [152, 112, 0], [152, 113, 0], [152, 114, 0], [152, 115, 0], [152, 116, 0], [152, 117, 0], [152, 118, 0], [152, 119, 0], [152, 120, 0], [152, 121, 0], [152, 122, 0], [152, 123, 0], [152, 124, 0], [152, 125, 0], [152, 126, 0], [152, 127, 0], [152, 128, 0], [152, 129, 0], [152, 130, 0], [152, 131, 0], [152, 132, 0], [152, 133, 0], [152, 134, 0], [152, 135, 0], [152, 136, 0], [152, 137, 0], [152, 138, 0], [152, 139, 0], [152, 140, 0], [152, 141, 0], [152, 142, 0], [152, 143, 0], [152, 144, 0], [152, 145, 0], [152, 146, 0], [152, 147, 0], [152, 148, 0], [152, 149, 0], [152, 150, 0], [152, 151, 0], [151, 152, 0], [150, 152, 0], [149, 152, 0], [148, 152, 0], [147, 152, 0], [146, 152, 0], [145, 152, 0], [144, 152, 0], [143, 152, 0], [142, 152, 0], [141, 152, 0], [140, 152, 0], [139, 152, 0], [138, 152, 0], [137, 152, 0], [136, 152, 0], [135, 152, 0], [134, 152, 0], [133, 152, 0], [132, 152, 0], [131, 152, 0], [130, 152, 0], [129, 152, 0], [128, 152, 0], [127, 152, 0], [126, 152, 0], [125, 152, 0], [124, 152, 0], [123, 152, 0], [122, 152, 0], [121, 152, 0], [120, 152, 0], [119, 152, 0], [118, 152, 0], [117, 152, 0], [116, 152, 0], [115, 152, 0], [114, 152, 0], [113, 152, 0], [112, 152, 0], [111, 152, 0], [110, 152, 0], [109, 152, 0], [108, 152, 0], [107, 152, 0], [106, 153, 0], [105, 153, 0], [104, 153, 0], [103, 153, 0], [102, 153, 0], [101, 153, 0], [100, 153, 0], [99, 153, 0], [98, 153, 0], [97, 153, 0], [96, 153, 0], [95, 153, 0], [94, 153, 0], [93, 153, 0], [92, 153, 0], [91, 153, 0], [90, 153, 0], [89, 154, 0], [89, 155, 0], [89, 156, 0], [89, 157, 0], [89, 158, 0], [89, 159, 0], [88, 160, 0], [88, 161, 0]]
  }
]

export const MAZE_TESTS: MazeTest[] = [
  {
    name: 'Small - Empty',
    maze: 'small_empty',
    start: [2, 2, 0],
    goal: [41, 41, 0],
    allowDiag: true,
    heuristic: 'manhattan',
    expectedPath: [
      [2, 2, 0],
      [3, 3, 0],
      [4, 4, 0],
      [5, 5, 0],
      [6, 6, 0],
      [7, 7, 0],
      [8, 8, 0],
      [9, 9, 0],
      [10, 10, 0],
      [11, 11, 0],
      [12, 12, 0],
      [13, 13, 0],
      [14, 14, 0],
      [15, 15, 0],
      [16, 16, 0],
      [17, 17, 0],
      [18, 18, 0],
      [19, 19, 0],
      [20, 20, 0],
      [21, 21, 0],
      [22, 22, 0],
      [23, 23, 0],
      [24, 24, 0],
      [25, 25, 0],
      [26, 26, 0],
      [27, 27, 0],
      [28, 28, 0],
      [29, 29, 0],
      [30, 30, 0],
      [31, 31, 0],
      [32, 32, 0],
      [33, 33, 0],
      [34, 34, 0],
      [35, 35, 0],
      [36, 36, 0],
      [37, 37, 0],
      [38, 38, 0],
      [39, 39, 0],
      [40, 40, 0],
      [41, 41, 0]
    ]
  },
  {
    name: 'Small - Obstacle',
    maze: 'small_obstacle',
    start: [2, 2, 0],
    goal: [41, 41, 0],
    allowDiag: true,
    heuristic: 'manhattan',
    expectedPath: [
      [2, 2, 0],
      [3, 3, 0],
      [4, 4, 0],
      [5, 5, 0],
      [6, 6, 0],
      [7, 7, 0],
      [8, 8, 0],
      [9, 9, 0],
      [10, 10, 0],
      [11, 11, 0],
      [12, 12, 0],
      [13, 13, 0],
      [14, 14, 0],
      [15, 15, 0],
      [16, 16, 0],
      [17, 17, 0],
      [18, 18, 0],
      [19, 19, 0],
      [20, 20, 0],
      [21, 21, 0],
      [21, 22, 0],
      [21, 23, 0],
      [21, 24, 0],
      [21, 25, 0],
      [21, 26, 0],
      [22, 27, 0],
      [23, 28, 0],
      [24, 29, 0],
      [25, 30, 0],
      [26, 31, 0],
      [27, 32, 0],
      [28, 33, 0],
      [29, 34, 0],
      [30, 35, 0],
      [31, 36, 0],
      [32, 37, 0],
      [33, 38, 0],
      [34, 39, 0],
      [35, 40, 0],
      [36, 41, 0],
      [37, 41, 0],
      [38, 41, 0],
      [39, 41, 0],
      [40, 41, 0],
      [41, 41, 0]
    ]
  },
  {
    name: 'Small - Maze',
    maze: 'small_maze',
    start: [2, 2, 0],
    goal: [41, 41, 0],
    allowDiag: false,
    heuristic: 'manhattan',
    expectedPath: [
      [2, 2, 0],
      [3, 2, 0],
      [4, 2, 0],
      [4, 3, 0],
      [5, 3, 0],
      [6, 3, 0],
      [7, 3, 0],
      [7, 4, 0],
      [7, 5, 0],
      [7, 6, 0],
      [7, 7, 0],
      [8, 7, 0],
      [9, 7, 0],
      [9, 6, 0],
      [9, 5, 0],
      [10, 5, 0],
      [11, 5, 0],
      [11, 6, 0],
      [11, 7, 0],
      [12, 7, 0],
      [13, 7, 0],
      [13, 8, 0],
      [13, 9, 0],
      [14, 9, 0],
      [15, 9, 0],
      [15, 8, 0],
      [15, 7, 0],
      [15, 6, 0],
      [15, 5, 0],
      [15, 4, 0],
      [15, 3, 0],
      [16, 3, 0],
      [17, 3, 0],
      [17, 4, 0],
      [17, 5, 0],
      [18, 5, 0],
      [19, 5, 0],
      [20, 5, 0],
      [21, 5, 0],
      [22, 5, 0],
      [23, 5, 0],
      [23, 6, 0],
      [23, 7, 0],
      [24, 7, 0],
      [24, 8, 0],
      [24, 9, 0],
      [23, 9, 0],
      [23, 10, 0],
      [23, 11, 0],
      [24, 11, 0],
      [25, 11, 0],
      [26, 11, 0],
      [27, 11, 0],
      [28, 11, 0],
      [29, 11, 0],
      [30, 11, 0],
      [30, 12, 0],
      [30, 13, 0],
      [29, 13, 0],
      [28, 13, 0],
      [27, 13, 0],
      [27, 14, 0],
      [27, 15, 0],
      [28, 15, 0],
      [29, 15, 0],
      [30, 15, 0],
      [31, 15, 0],
      [31, 16, 0],
      [31, 17, 0],
      [31, 18, 0],
      [31, 19, 0],
      [32, 19, 0],
      [33, 19, 0],
      [34, 19, 0],
      [35, 19, 0],
      [36, 19, 0],
      [37, 19, 0],
      [37, 20, 0],
      [37, 21, 0],
      [37, 22, 0],
      [37, 23, 0],
      [37, 24, 0],
      [37, 25, 0],
      [36, 25, 0],
      [35, 25, 0],
      [34, 25, 0],
      [33, 25, 0],
      [32, 25, 0],
      [31, 25, 0],
      [31, 26, 0],
      [31, 27, 0],
      [32, 27, 0],
      [33, 27, 0],
      [34, 27, 0],
      [35, 27, 0],
      [36, 27, 0],
      [37, 27, 0],
      [37, 28, 0],
      [37, 29, 0],
      [38, 29, 0],
      [39, 29, 0],
      [39, 28, 0],
      [39, 27, 0],
      [40, 27, 0],
      [41, 27, 0],
      [41, 28, 0],
      [41, 29, 0],
      [41, 30, 0],
      [41, 31, 0],
      [41, 32, 0],
      [41, 33, 0],
      [41, 34, 0],
      [41, 35, 0],
      [40, 35, 0],
      [39, 35, 0],
      [39, 34, 0],
      [39, 33, 0],
      [39, 32, 0],
      [39, 31, 0],
      [38, 31, 0],
      [37, 31, 0],
      [36, 31, 0],
      [35, 31, 0],
      [35, 30, 0],
      [35, 29, 0],
      [34, 29, 0],
      [33, 29, 0],
      [32, 29, 0],
      [31, 29, 0],
      [31, 30, 0],
      [31, 31, 0],
      [30, 31, 0],
      [29, 31, 0],
      [28, 31, 0],
      [27, 31, 0],
      [27, 30, 0],
      [27, 29, 0],
      [26, 29, 0],
      [25, 29, 0],
      [24, 29, 0],
      [23, 29, 0],
      [23, 28, 0],
      [23, 27, 0],
      [23, 26, 0],
      [23, 25, 0],
      [22, 25, 0],
      [21, 25, 0],
      [21, 24, 0],
      [21, 23, 0],
      [20, 23, 0],
      [19, 23, 0],
      [18, 23, 0],
      [17, 23, 0],
      [17, 24, 0],
      [17, 25, 0],
      [17, 26, 0],
      [17, 27, 0],
      [18, 27, 0],
      [19, 27, 0],
      [19, 28, 0],
      [19, 29, 0],
      [19, 30, 0],
      [19, 31, 0],
      [19, 32, 0],
      [19, 33, 0],
      [20, 33, 0],
      [21, 33, 0],
      [22, 33, 0],
      [23, 33, 0],
      [23, 32, 0],
      [23, 31, 0],
      [24, 31, 0],
      [25, 31, 0],
      [25, 32, 0],
      [25, 33, 0],
      [26, 33, 0],
      [27, 33, 0],
      [28, 33, 0],
      [29, 33, 0],
      [30, 33, 0],
      [31, 33, 0],
      [32, 33, 0],
      [33, 33, 0],
      [34, 33, 0],
      [35, 33, 0],
      [36, 33, 0],
      [36, 34, 0],
      [36, 35, 0],
      [35, 35, 0],
      [35, 36, 0],
      [35, 37, 0],
      [34, 37, 0],
      [33, 37, 0],
      [33, 36, 0],
      [33, 35, 0],
      [32, 35, 0],
      [31, 35, 0],
      [30, 35, 0],
      [29, 35, 0],
      [29, 36, 0],
      [29, 37, 0],
      [30, 37, 0],
      [31, 37, 0],
      [31, 38, 0],
      [31, 39, 0],
      [31, 40, 0],
      [31, 41, 0],
      [32, 41, 0],
      [33, 41, 0],
      [33, 40, 0],
      [33, 39, 0],
      [34, 39, 0],
      [35, 39, 0],
      [35, 40, 0],
      [35, 41, 0],
      [36, 41, 0],
      [37, 41, 0],
      [38, 41, 0],
      [39, 41, 0],
      [40, 41, 0],
      [41, 41, 0]
    ]
  },
  // {
  //   name: 'Medium - Maze',
  //   maze: 'medium_maze',
  //   heuristic: 'euclidean',
  //   start: [2, 0, 0],
  //   goal: [1801, 1799, 0],
  //   allowDiag: true,
  //   expectedPath:  [[73, 0, 0], [73, 1, 0], [73, 2, 0], [73, 3, 0], [73, 4, 0], [73, 5, 0], [73, 6, 0], [72, 7, 0], [71, 8, 0], [70, 8, 0], [69, 8, 0], [68, 8, 0], [67, 8, 0], [66, 8, 0], [65, 8, 0], [64, 8, 0], [63, 8, 0], [62, 9, 0], [61, 9, 0], [60, 9, 0], [59, 9, 0], [58, 9, 0], [57, 10, 0], [57, 11, 0], [57, 12, 0], [57, 13, 0], [57, 14, 0], [57, 15, 0], [57, 16, 0], [57, 17, 0], [57, 18, 0], [57, 19, 0], [57, 20, 0], [57, 21, 0], [57, 22, 0], [57, 23, 0], [58, 24, 0], [59, 25, 0], [60, 25, 0], [61, 25, 0], [62, 25, 0], [63, 25, 0], [64, 25, 0], [65, 25, 0], [66, 25, 0], [67, 25, 0], [68, 25, 0], [69, 25, 0], [70, 25, 0], [71, 25, 0], [72, 25, 0], [73, 25, 0], [74, 25, 0], [75, 25, 0], [76, 25, 0], [77, 25, 0], [78, 25, 0], [79, 25, 0], [80, 25, 0], [81, 25, 0], [82, 25, 0], [83, 25, 0], [84, 25, 0], [85, 25, 0], [86, 25, 0], [87, 25, 0], [88, 26, 0], [88, 27, 0], [88, 28, 0], [88, 29, 0], [88, 30, 0], [88, 31, 0], [88, 32, 0], [88, 33, 0], [88, 34, 0], [88, 35, 0], [88, 36, 0], [88, 37, 0], [88, 38, 0], [88, 39, 0], [88, 40, 0], [88, 41, 0], [88, 42, 0], [88, 43, 0], [88, 44, 0], [88, 45, 0], [88, 46, 0], [88, 47, 0], [88, 48, 0], [88, 49, 0], [88, 50, 0], [88, 51, 0], [88, 52, 0], [88, 53, 0], [88, 54, 0], [89, 55, 0], [90, 56, 0], [91, 57, 0], [92, 57, 0], [93, 57, 0], [94, 57, 0], [95, 57, 0], [96, 57, 0], [97, 57, 0], [98, 57, 0], [99, 57, 0], [100, 57, 0], [101, 57, 0], [102, 57, 0], [103, 57, 0], [104, 58, 0], [104, 59, 0], [104, 60, 0], [104, 61, 0], [104, 62, 0], [104, 63, 0], [104, 64, 0], [104, 65, 0], [104, 66, 0], [104, 67, 0], [104, 68, 0], [104, 69, 0], [104, 70, 0], [104, 71, 0], [103, 72, 0], [102, 73, 0], [101, 73, 0], [100, 73, 0], [99, 73, 0], [98, 73, 0], [97, 73, 0], [96, 73, 0], [95, 73, 0], [94, 73, 0], [93, 73, 0], [92, 73, 0], [91, 73, 0], [90, 73, 0], [89, 74, 0], [89, 75, 0], [89, 76, 0], [89, 77, 0], [89, 78, 0], [89, 79, 0], [89, 80, 0], [89, 81, 0], [89, 82, 0], [89, 83, 0], [89, 84, 0], [89, 85, 0], [89, 86, 0], [89, 87, 0], [90, 88, 0], [91, 88, 0], [92, 88, 0], [93, 88, 0], [94, 88, 0], [95, 88, 0], [96, 88, 0], [97, 88, 0], [98, 88, 0], [99, 88, 0], [100, 88, 0], [101, 88, 0], [102, 88, 0], [103, 88, 0], [104, 88, 0], [105, 88, 0], [106, 88, 0], [107, 88, 0], [108, 88, 0], [109, 88, 0], [110, 88, 0], [111, 88, 0], [112, 88, 0], [113, 88, 0], [114, 88, 0], [115, 88, 0], [116, 88, 0], [117, 88, 0], [118, 88, 0], [119, 88, 0], [120, 88, 0], [121, 88, 0], [122, 88, 0], [123, 88, 0], [124, 88, 0], [125, 88, 0], [126, 88, 0], [127, 88, 0], [128, 88, 0], [129, 88, 0], [130, 88, 0], [131, 88, 0], [132, 88, 0], [133, 88, 0], [134, 88, 0], [135, 88, 0], [136, 87, 0], [136, 86, 0], [136, 85, 0], [136, 84, 0], [136, 83, 0], [136, 82, 0], [136, 81, 0], [136, 80, 0], [136, 79, 0], [136, 78, 0], [136, 77, 0], [136, 76, 0], [136, 75, 0], [136, 74, 0], [135, 73, 0], [134, 73, 0], [133, 73, 0], [132, 73, 0], [131, 73, 0], [130, 73, 0], [129, 73, 0], [128, 73, 0], [127, 73, 0], [126, 73, 0], [125, 73, 0], [124, 73, 0], [123, 73, 0], [122, 72, 0], [121, 71, 0], [121, 70, 0], [121, 69, 0], [121, 68, 0], [121, 67, 0], [121, 66, 0], [121, 65, 0], [121, 64, 0], [121, 63, 0], [121, 62, 0], [121, 61, 0], [121, 60, 0], [121, 59, 0], [121, 58, 0], [122, 57, 0], [123, 57, 0], [124, 57, 0], [125, 57, 0], [126, 57, 0], [127, 57, 0], [128, 57, 0], [129, 57, 0], [130, 57, 0], [131, 57, 0], [132, 57, 0], [133, 57, 0], [134, 57, 0], [135, 56, 0], [136, 55, 0], [136, 54, 0], [136, 53, 0], [136, 52, 0], [136, 51, 0], [136, 50, 0], [136, 49, 0], [136, 48, 0], [136, 47, 0], [136, 46, 0], [136, 45, 0], [136, 44, 0], [136, 43, 0], [136, 42, 0], [136, 41, 0], [136, 40, 0], [136, 39, 0], [136, 38, 0], [136, 37, 0], [136, 36, 0], [136, 35, 0], [136, 34, 0], [136, 33, 0], [136, 32, 0], [136, 31, 0], [136, 30, 0], [136, 29, 0], [136, 28, 0], [136, 27, 0], [136, 26, 0], [136, 25, 0], [136, 24, 0], [136, 23, 0], [136, 22, 0], [136, 21, 0], [136, 20, 0], [136, 19, 0], [136, 18, 0], [136, 17, 0], [136, 16, 0], [136, 15, 0], [136, 14, 0], [136, 13, 0], [136, 12, 0], [136, 11, 0], [137, 10, 0], [138, 9, 0], [139, 9, 0], [140, 9, 0], [141, 9, 0], [142, 9, 0], [143, 9, 0], [144, 9, 0], [145, 9, 0], [146, 9, 0], [147, 9, 0], [148, 9, 0], [149, 9, 0], [150, 9, 0], [151, 9, 0], [152, 10, 0], [152, 11, 0], [152, 12, 0], [152, 13, 0], [152, 14, 0], [152, 15, 0], [152, 16, 0], [152, 17, 0], [152, 18, 0], [152, 19, 0], [152, 20, 0], [152, 21, 0], [152, 22, 0], [152, 23, 0], [152, 24, 0], [152, 25, 0], [152, 26, 0], [152, 27, 0], [152, 28, 0], [152, 29, 0], [152, 30, 0], [152, 31, 0], [152, 32, 0], [152, 33, 0], [152, 34, 0], [152, 35, 0], [152, 36, 0], [152, 37, 0], [152, 38, 0], [152, 39, 0], [152, 40, 0], [152, 41, 0], [152, 42, 0], [152, 43, 0], [152, 44, 0], [152, 45, 0], [152, 46, 0], [152, 47, 0], [152, 48, 0], [152, 49, 0], [152, 50, 0], [152, 51, 0], [152, 52, 0], [152, 53, 0], [152, 54, 0], [152, 55, 0], [152, 56, 0], [152, 57, 0], [152, 58, 0], [152, 59, 0], [152, 60, 0], [152, 61, 0], [152, 62, 0], [152, 63, 0], [152, 64, 0], [152, 65, 0], [152, 66, 0], [152, 67, 0], [152, 68, 0], [152, 69, 0], [152, 70, 0], [152, 71, 0], [152, 72, 0], [152, 73, 0], [152, 74, 0], [152, 75, 0], [152, 76, 0], [152, 77, 0], [152, 78, 0], [152, 79, 0], [152, 80, 0], [152, 81, 0], [152, 82, 0], [152, 83, 0], [152, 84, 0], [152, 85, 0], [152, 86, 0], [152, 87, 0], [152, 88, 0], [152, 89, 0], [152, 90, 0], [152, 91, 0], [152, 92, 0], [152, 93, 0], [152, 94, 0], [152, 95, 0], [152, 96, 0], [152, 97, 0], [152, 98, 0], [152, 99, 0], [152, 100, 0], [152, 101, 0], [152, 102, 0], [152, 103, 0], [152, 104, 0], [152, 105, 0], [152, 106, 0], [152, 107, 0], [152, 108, 0], [152, 109, 0], [152, 110, 0], [152, 111, 0], [152, 112, 0], [152, 113, 0], [152, 114, 0], [152, 115, 0], [152, 116, 0], [152, 117, 0], [152, 118, 0], [152, 119, 0], [152, 120, 0], [152, 121, 0], [152, 122, 0], [152, 123, 0], [152, 124, 0], [152, 125, 0], [152, 126, 0], [152, 127, 0], [152, 128, 0], [152, 129, 0], [152, 130, 0], [152, 131, 0], [152, 132, 0], [152, 133, 0], [152, 134, 0], [152, 135, 0], [152, 136, 0], [152, 137, 0], [152, 138, 0], [152, 139, 0], [152, 140, 0], [152, 141, 0], [152, 142, 0], [152, 143, 0], [152, 144, 0], [152, 145, 0], [152, 146, 0], [152, 147, 0], [152, 148, 0], [152, 149, 0], [152, 150, 0], [152, 151, 0], [151, 152, 0], [150, 152, 0], [149, 152, 0], [148, 152, 0], [147, 152, 0], [146, 152, 0], [145, 152, 0], [144, 152, 0], [143, 152, 0], [142, 152, 0], [141, 152, 0], [140, 152, 0], [139, 152, 0], [138, 152, 0], [137, 152, 0], [136, 152, 0], [135, 152, 0], [134, 152, 0], [133, 152, 0], [132, 152, 0], [131, 152, 0], [130, 152, 0], [129, 152, 0], [128, 152, 0], [127, 152, 0], [126, 152, 0], [125, 152, 0], [124, 152, 0], [123, 152, 0], [122, 152, 0], [121, 152, 0], [120, 152, 0], [119, 152, 0], [118, 152, 0], [117, 152, 0], [116, 152, 0], [115, 152, 0], [114, 152, 0], [113, 152, 0], [112, 152, 0], [111, 152, 0], [110, 152, 0], [109, 152, 0], [108, 152, 0], [107, 152, 0], [106, 153, 0], [105, 153, 0], [104, 153, 0], [103, 153, 0], [102, 153, 0], [101, 153, 0], [100, 153, 0], [99, 153, 0], [98, 153, 0], [97, 153, 0], [96, 153, 0], [95, 153, 0], [94, 153, 0], [93, 153, 0], [92, 153, 0], [91, 153, 0], [90, 153, 0], [89, 154, 0], [89, 155, 0], [89, 156, 0], [89, 157, 0], [89, 158, 0], [89, 159, 0], [88, 160, 0], [88, 161, 0]]
  // },
  // {
  //   name: 'Medium - Maze',
  //   maze: 'medium_maze',
  //   heuristic: 'euclidean',
  //   start: [392, 0, 0],
  //   goal: [408, 799, 0],
  //   allowDiag: true,
  //   expectedPath:  [[73, 0, 0], [73, 1, 0], [73, 2, 0], [73, 3, 0], [73, 4, 0], [73, 5, 0], [73, 6, 0], [72, 7, 0], [71, 8, 0], [70, 8, 0], [69, 8, 0], [68, 8, 0], [67, 8, 0], [66, 8, 0], [65, 8, 0], [64, 8, 0], [63, 8, 0], [62, 9, 0], [61, 9, 0], [60, 9, 0], [59, 9, 0], [58, 9, 0], [57, 10, 0], [57, 11, 0], [57, 12, 0], [57, 13, 0], [57, 14, 0], [57, 15, 0], [57, 16, 0], [57, 17, 0], [57, 18, 0], [57, 19, 0], [57, 20, 0], [57, 21, 0], [57, 22, 0], [57, 23, 0], [58, 24, 0], [59, 25, 0], [60, 25, 0], [61, 25, 0], [62, 25, 0], [63, 25, 0], [64, 25, 0], [65, 25, 0], [66, 25, 0], [67, 25, 0], [68, 25, 0], [69, 25, 0], [70, 25, 0], [71, 25, 0], [72, 25, 0], [73, 25, 0], [74, 25, 0], [75, 25, 0], [76, 25, 0], [77, 25, 0], [78, 25, 0], [79, 25, 0], [80, 25, 0], [81, 25, 0], [82, 25, 0], [83, 25, 0], [84, 25, 0], [85, 25, 0], [86, 25, 0], [87, 25, 0], [88, 26, 0], [88, 27, 0], [88, 28, 0], [88, 29, 0], [88, 30, 0], [88, 31, 0], [88, 32, 0], [88, 33, 0], [88, 34, 0], [88, 35, 0], [88, 36, 0], [88, 37, 0], [88, 38, 0], [88, 39, 0], [88, 40, 0], [88, 41, 0], [88, 42, 0], [88, 43, 0], [88, 44, 0], [88, 45, 0], [88, 46, 0], [88, 47, 0], [88, 48, 0], [88, 49, 0], [88, 50, 0], [88, 51, 0], [88, 52, 0], [88, 53, 0], [88, 54, 0], [89, 55, 0], [90, 56, 0], [91, 57, 0], [92, 57, 0], [93, 57, 0], [94, 57, 0], [95, 57, 0], [96, 57, 0], [97, 57, 0], [98, 57, 0], [99, 57, 0], [100, 57, 0], [101, 57, 0], [102, 57, 0], [103, 57, 0], [104, 58, 0], [104, 59, 0], [104, 60, 0], [104, 61, 0], [104, 62, 0], [104, 63, 0], [104, 64, 0], [104, 65, 0], [104, 66, 0], [104, 67, 0], [104, 68, 0], [104, 69, 0], [104, 70, 0], [104, 71, 0], [103, 72, 0], [102, 73, 0], [101, 73, 0], [100, 73, 0], [99, 73, 0], [98, 73, 0], [97, 73, 0], [96, 73, 0], [95, 73, 0], [94, 73, 0], [93, 73, 0], [92, 73, 0], [91, 73, 0], [90, 73, 0], [89, 74, 0], [89, 75, 0], [89, 76, 0], [89, 77, 0], [89, 78, 0], [89, 79, 0], [89, 80, 0], [89, 81, 0], [89, 82, 0], [89, 83, 0], [89, 84, 0], [89, 85, 0], [89, 86, 0], [89, 87, 0], [90, 88, 0], [91, 88, 0], [92, 88, 0], [93, 88, 0], [94, 88, 0], [95, 88, 0], [96, 88, 0], [97, 88, 0], [98, 88, 0], [99, 88, 0], [100, 88, 0], [101, 88, 0], [102, 88, 0], [103, 88, 0], [104, 88, 0], [105, 88, 0], [106, 88, 0], [107, 88, 0], [108, 88, 0], [109, 88, 0], [110, 88, 0], [111, 88, 0], [112, 88, 0], [113, 88, 0], [114, 88, 0], [115, 88, 0], [116, 88, 0], [117, 88, 0], [118, 88, 0], [119, 88, 0], [120, 88, 0], [121, 88, 0], [122, 88, 0], [123, 88, 0], [124, 88, 0], [125, 88, 0], [126, 88, 0], [127, 88, 0], [128, 88, 0], [129, 88, 0], [130, 88, 0], [131, 88, 0], [132, 88, 0], [133, 88, 0], [134, 88, 0], [135, 88, 0], [136, 87, 0], [136, 86, 0], [136, 85, 0], [136, 84, 0], [136, 83, 0], [136, 82, 0], [136, 81, 0], [136, 80, 0], [136, 79, 0], [136, 78, 0], [136, 77, 0], [136, 76, 0], [136, 75, 0], [136, 74, 0], [135, 73, 0], [134, 73, 0], [133, 73, 0], [132, 73, 0], [131, 73, 0], [130, 73, 0], [129, 73, 0], [128, 73, 0], [127, 73, 0], [126, 73, 0], [125, 73, 0], [124, 73, 0], [123, 73, 0], [122, 72, 0], [121, 71, 0], [121, 70, 0], [121, 69, 0], [121, 68, 0], [121, 67, 0], [121, 66, 0], [121, 65, 0], [121, 64, 0], [121, 63, 0], [121, 62, 0], [121, 61, 0], [121, 60, 0], [121, 59, 0], [121, 58, 0], [122, 57, 0], [123, 57, 0], [124, 57, 0], [125, 57, 0], [126, 57, 0], [127, 57, 0], [128, 57, 0], [129, 57, 0], [130, 57, 0], [131, 57, 0], [132, 57, 0], [133, 57, 0], [134, 57, 0], [135, 56, 0], [136, 55, 0], [136, 54, 0], [136, 53, 0], [136, 52, 0], [136, 51, 0], [136, 50, 0], [136, 49, 0], [136, 48, 0], [136, 47, 0], [136, 46, 0], [136, 45, 0], [136, 44, 0], [136, 43, 0], [136, 42, 0], [136, 41, 0], [136, 40, 0], [136, 39, 0], [136, 38, 0], [136, 37, 0], [136, 36, 0], [136, 35, 0], [136, 34, 0], [136, 33, 0], [136, 32, 0], [136, 31, 0], [136, 30, 0], [136, 29, 0], [136, 28, 0], [136, 27, 0], [136, 26, 0], [136, 25, 0], [136, 24, 0], [136, 23, 0], [136, 22, 0], [136, 21, 0], [136, 20, 0], [136, 19, 0], [136, 18, 0], [136, 17, 0], [136, 16, 0], [136, 15, 0], [136, 14, 0], [136, 13, 0], [136, 12, 0], [136, 11, 0], [137, 10, 0], [138, 9, 0], [139, 9, 0], [140, 9, 0], [141, 9, 0], [142, 9, 0], [143, 9, 0], [144, 9, 0], [145, 9, 0], [146, 9, 0], [147, 9, 0], [148, 9, 0], [149, 9, 0], [150, 9, 0], [151, 9, 0], [152, 10, 0], [152, 11, 0], [152, 12, 0], [152, 13, 0], [152, 14, 0], [152, 15, 0], [152, 16, 0], [152, 17, 0], [152, 18, 0], [152, 19, 0], [152, 20, 0], [152, 21, 0], [152, 22, 0], [152, 23, 0], [152, 24, 0], [152, 25, 0], [152, 26, 0], [152, 27, 0], [152, 28, 0], [152, 29, 0], [152, 30, 0], [152, 31, 0], [152, 32, 0], [152, 33, 0], [152, 34, 0], [152, 35, 0], [152, 36, 0], [152, 37, 0], [152, 38, 0], [152, 39, 0], [152, 40, 0], [152, 41, 0], [152, 42, 0], [152, 43, 0], [152, 44, 0], [152, 45, 0], [152, 46, 0], [152, 47, 0], [152, 48, 0], [152, 49, 0], [152, 50, 0], [152, 51, 0], [152, 52, 0], [152, 53, 0], [152, 54, 0], [152, 55, 0], [152, 56, 0], [152, 57, 0], [152, 58, 0], [152, 59, 0], [152, 60, 0], [152, 61, 0], [152, 62, 0], [152, 63, 0], [152, 64, 0], [152, 65, 0], [152, 66, 0], [152, 67, 0], [152, 68, 0], [152, 69, 0], [152, 70, 0], [152, 71, 0], [152, 72, 0], [152, 73, 0], [152, 74, 0], [152, 75, 0], [152, 76, 0], [152, 77, 0], [152, 78, 0], [152, 79, 0], [152, 80, 0], [152, 81, 0], [152, 82, 0], [152, 83, 0], [152, 84, 0], [152, 85, 0], [152, 86, 0], [152, 87, 0], [152, 88, 0], [152, 89, 0], [152, 90, 0], [152, 91, 0], [152, 92, 0], [152, 93, 0], [152, 94, 0], [152, 95, 0], [152, 96, 0], [152, 97, 0], [152, 98, 0], [152, 99, 0], [152, 100, 0], [152, 101, 0], [152, 102, 0], [152, 103, 0], [152, 104, 0], [152, 105, 0], [152, 106, 0], [152, 107, 0], [152, 108, 0], [152, 109, 0], [152, 110, 0], [152, 111, 0], [152, 112, 0], [152, 113, 0], [152, 114, 0], [152, 115, 0], [152, 116, 0], [152, 117, 0], [152, 118, 0], [152, 119, 0], [152, 120, 0], [152, 121, 0], [152, 122, 0], [152, 123, 0], [152, 124, 0], [152, 125, 0], [152, 126, 0], [152, 127, 0], [152, 128, 0], [152, 129, 0], [152, 130, 0], [152, 131, 0], [152, 132, 0], [152, 133, 0], [152, 134, 0], [152, 135, 0], [152, 136, 0], [152, 137, 0], [152, 138, 0], [152, 139, 0], [152, 140, 0], [152, 141, 0], [152, 142, 0], [152, 143, 0], [152, 144, 0], [152, 145, 0], [152, 146, 0], [152, 147, 0], [152, 148, 0], [152, 149, 0], [152, 150, 0], [152, 151, 0], [151, 152, 0], [150, 152, 0], [149, 152, 0], [148, 152, 0], [147, 152, 0], [146, 152, 0], [145, 152, 0], [144, 152, 0], [143, 152, 0], [142, 152, 0], [141, 152, 0], [140, 152, 0], [139, 152, 0], [138, 152, 0], [137, 152, 0], [136, 152, 0], [135, 152, 0], [134, 152, 0], [133, 152, 0], [132, 152, 0], [131, 152, 0], [130, 152, 0], [129, 152, 0], [128, 152, 0], [127, 152, 0], [126, 152, 0], [125, 152, 0], [124, 152, 0], [123, 152, 0], [122, 152, 0], [121, 152, 0], [120, 152, 0], [119, 152, 0], [118, 152, 0], [117, 152, 0], [116, 152, 0], [115, 152, 0], [114, 152, 0], [113, 152, 0], [112, 152, 0], [111, 152, 0], [110, 152, 0], [109, 152, 0], [108, 152, 0], [107, 152, 0], [106, 153, 0], [105, 153, 0], [104, 153, 0], [103, 153, 0], [102, 153, 0], [101, 153, 0], [100, 153, 0], [99, 153, 0], [98, 153, 0], [97, 153, 0], [96, 153, 0], [95, 153, 0], [94, 153, 0], [93, 153, 0], [92, 153, 0], [91, 153, 0], [90, 153, 0], [89, 154, 0], [89, 155, 0], [89, 156, 0], [89, 157, 0], [89, 158, 0], [89, 159, 0], [88, 160, 0], [88, 161, 0]]
  // },
  // {
  //   name: 'Large Maze',
  //   maze: 'large_maze',
  //   heuristic: 'euclidean',
  //   start: [792, 0, 0],
  //   goal: [808, 1601, 0],
  //   allowDiag: true,
  //   expectedPath: [[0, 0, 0], [1, 1, 1], [2, 2, 2]]
  // },
  {
    name: 'Small 3D - Empty',
    maze: '3D_empty_small',
    heuristic: 'euclidean',
    start: [0, 0, 0],
    goal: [2, 2, 2],
    allowDiag: true,
    expectedPath: [[0, 0, 0], [1, 1, 1], [2, 2, 2]]
  }
];
