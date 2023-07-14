export interface GameInfo {
  id: string;
  name: GameName;
  title: string;
  path: string;
  description: string;
  implemented: boolean;
  cover?: string;
}

export enum GameName {
  Tetris = "Tetris",
  Snake = "Snake",
  Pacman = "Pacman",
  Match3 = "Match3",
  Minesweeper = "Minesweeper",
  Arkanoid = "Arkanoid",
  Sudoku = "Sudoku",
  Solitaire = "Solitaire",
  TwentyFortyEight = "TwentyFortyEight",
}

export enum GameStatus {
  NotStarted = "NotStarted",
  Playing = "Playing",
  Paused = "Paused",
  Victory = "Victory",
  Defeat = "Defeat",
}

export interface Coordinates {
  x: number;
  y: number;
}

// This throwing ts 2590 error, because made too many unions
// type HexLetter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
// type HexDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
// type HexCharacter = HexLetter | HexDigit;
// type HexPair = `${HexCharacter}${HexCharacter}`;

// type HexCodeShort = `${HexPair}${HexPair}${HexPair}`;
// type HexCodeClassic = `${HexPair}${HexPair}${HexPair}${HexPair}${HexPair}${HexPair}`;
// type HexCodeWithAlpha = `${HexPair}${HexPair}${HexPair}${HexPair}`;

// export type HexCode = `#${HexCodeShort | HexCodeClassic | HexCodeWithAlpha}`;
export type HexCode = string;
