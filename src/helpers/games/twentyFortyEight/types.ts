import { Tile } from "@/components/Games/TwentyFortyEight/Game/Tile";

export enum TwentyFortyEightKeyCode {
  Left = "KeyA",
  LeftArrow = "ArrowLeft",
  Right = "KeyD",
  RightArrow = "ArrowRight",
  Down = "KeyS",
  DownArrow = "ArrowDown",
  Up = "KeyW",
  UpArrow = "ArrowUp",
}

export enum Direction {
  Left = "Left",
  Right = "Right",
  Up = "Up",
  Down = "Down",
}

export type GameField = (Tile | null)[][];

export interface Guideline {
  x: number[];
  y: number[];
}
