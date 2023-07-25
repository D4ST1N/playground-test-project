import { GameDifficulty } from "@/helpers/games/sudoku/types";

export const sudokuSamples = [
  {
    id: "1",
    name: "Sudoku 1",
    difficulty: GameDifficulty.Easy,
    field: [
      0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 3, 0, 0, 7, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0,

      0, 0, 0, 9, 0, 8, 0, 7, 1, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 9, 0, 0,

      5, 0, 7, 0, 0, 6, 0, 0, 0, 2, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 1, 8, 0, 0, 0, 0, 2,
    ],
  },
  {
    id: "2",
    name: "Sudoku 2",
    difficulty: GameDifficulty.Easy,
    field: [
      0, 0, 0, 0, 1, 7, 2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 3, 0, 0, 0,

      4, 0, 0, 7, 8, 0, 5, 0, 0, 0, 2, 5, 0, 0, 0, 8, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0,

      6, 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 3, 0, 2, 0, 0, 0, 0, 1, 7, 0, 4,
    ],
  },
  {
    id: "3",
    name: "Sudoku 3",
    difficulty: GameDifficulty.Easy,
    field: [
      9, 0, 0, 5, 0, 1, 7, 0, 0, 2, 0, 1, 0, 0, 9, 0, 0, 0, 0, 0, 0, 8, 7, 0, 0, 9, 0,

      0, 8, 0, 0, 6, 4, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0,

      7, 0, 6, 2, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 0, 0, 0, 0, 4, 0,
    ],
  },
  {
    id: "4",
    name: "Sudoku 4",
    difficulty: GameDifficulty.Hard,
    field: [
      8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0, 0, 0, 0, 0, 7, 0, 0, 9, 0, 2, 0, 0,

      0, 5, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 4, 5, 7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0,

      0, 0, 1, 0, 0, 0, 0, 6, 8, 0, 0, 8, 5, 0, 0, 0, 1, 0, 0, 9, 0, 0, 0, 0, 4, 0, 0,
    ],
  },
  {
    id: "5",
    name: "Sudoku 5",
    difficulty: GameDifficulty.Hard,
    field: [
      0, 0, 3, 9, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 3, 6, 0, 0, 8, 0, 0, 0, 1, 0, 0,

      0, 4, 0, 0, 6, 0, 0, 7, 3, 8, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,

      0, 0, 4, 0, 7, 0, 0, 6, 8, 6, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 5, 0, 0,
    ],
  },
  {
    id: "6",
    name: "Sudoku 6",
    difficulty: GameDifficulty.Hard,
    field: [
      0, 0, 0, 8, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0,

      0, 0, 0, 0, 7, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0,

      6, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 6, 0, 0,
    ],
  },
  {
    id: "7",
    name: "Sudoku 7",
    difficulty: GameDifficulty.Hard,
    field: [
      2, 3, 7, 8, 4, 1, 5, 6, 9, 1, 8, 6, 7, 9, 5, 2, 4, 3, 5, 9, 4, 3, 2, 6, 7, 1, 8,

      3, 1, 5, 6, 7, 4, 8, 9, 2, 4, 6, 9, 5, 8, 2, 1, 3, 7, 7, 2, 8, 1, 3, 9, 4, 5, 6,

      6, 4, 2, 9, 1, 8, 3, 7, 5, 8, 5, 3, 4, 6, 7, 9, 2, 1, 9, 7, 1, 2, 5, 3, 6, 8, 4,
    ],
  },
];

export const sudokuBases = [
  [
    2, 3, 7, 8, 4, 1, 5, 6, 9, 1, 8, 6, 7, 9, 5, 2, 4, 3, 5, 9, 4, 3, 2, 6, 7, 1, 8,

    3, 1, 5, 6, 7, 4, 8, 9, 2, 4, 6, 9, 5, 8, 2, 1, 3, 7, 7, 2, 8, 1, 3, 9, 4, 5, 6,

    6, 4, 2, 9, 1, 8, 3, 7, 5, 8, 5, 3, 4, 6, 7, 9, 2, 1, 9, 7, 1, 2, 5, 3, 6, 8, 4,
  ],
  [
    7, 2, 4, 3, 8, 9, 1, 5, 6, 6, 3, 8, 5, 7, 1, 2, 4, 9, 9, 1, 5, 6, 4, 2, 8, 3, 7,

    4, 5, 6, 9, 2, 8, 3, 7, 1, 8, 7, 2, 1, 3, 5, 9, 6, 4, 1, 9, 3, 7, 6, 4, 5, 2, 8,

    2, 6, 9, 4, 1, 3, 7, 8, 5, 5, 8, 7, 2, 9, 6, 4, 1, 3, 3, 4, 1, 8, 5, 7, 6, 9, 2,
  ],
  [
    5, 6, 3, 9, 1, 7, 2, 4, 8, 1, 7, 2, 4, 6, 8, 3, 5, 9, 8, 4, 9, 2, 5, 3, 6, 1, 7,

    3, 2, 5, 1, 4, 9, 8, 7, 6, 9, 8, 7, 6, 3, 5, 4, 2, 1, 4, 1, 6, 7, 8, 2, 5, 9, 3,

    2, 5, 8, 3, 9, 1, 7, 6, 4, 6, 3, 1, 5, 7, 4, 9, 8, 2, 7, 9, 4, 8, 2, 6, 1, 3, 5,
  ],
  [
    2, 7, 1, 4, 3, 9, 6, 8, 5, 9, 6, 8, 5, 2, 1, 7, 3, 4, 4, 5, 3, 8, 7, 6, 1, 9, 2,

    6, 9, 4, 7, 8, 5, 2, 1, 3, 5, 1, 7, 3, 9, 2, 4, 6, 8, 3, 8, 2, 1, 6, 4, 5, 7, 9,

    8, 4, 5, 9, 1, 7, 3, 2, 6, 7, 3, 6, 2, 4, 8, 9, 5, 1, 1, 2, 9, 6, 5, 3, 8, 4, 7,
  ],
  [
    9, 4, 3, 6, 8, 2, 1, 7, 5, 8, 1, 2, 7, 5, 3, 6, 4, 9, 6, 7, 5, 4, 9, 1, 2, 8, 3,

    1, 5, 4, 2, 3, 7, 8, 9, 6, 3, 6, 9, 8, 4, 5, 7, 2, 1, 2, 8, 7, 1, 6, 9, 5, 3, 4,

    5, 2, 1, 9, 7, 4, 3, 6, 8, 7, 9, 6, 3, 1, 8, 4, 5, 2, 4, 3, 8, 5, 2, 6, 9, 1, 7,
  ],
];

export const sudokuDifficultiesMap = {
  [GameDifficulty.Easy]: 46,
  [GameDifficulty.Medium]: 55,
  [GameDifficulty.Hard]: 66,
  [GameDifficulty.Expert]: 81,
};
