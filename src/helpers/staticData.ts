import { v4 as uuidv4 } from "uuid";
import { GameInfo } from "@/helpers/generalTypes";

export const games: GameInfo[] = [
  {
    id: uuidv4(),
    name: "Tetris",
    path: "tetris",
    description:
      "Tetris is a tile-matching puzzle video game originally designed and programmed by Soviet Russian software engineer Alexey Pajitnov in 1984.",
    implemented: true,
  },
  {
    id: uuidv4(),
    name: "Snake",
    path: "snake",
    description:
      "Snake is the common name for a video game concept where the player maneuvers a line which grows in length, with the line itself being a primary obstacle.",
    implemented: false,
  },
  {
    id: uuidv4(),
    name: "Pacman",
    path: "pacman",
    description:
      "Pac-Man is a classic arcade game where players control a yellow character, navigating through mazes, eating dots, and avoiding ghosts to achieve high scores.",
    implemented: false,
  },
  {
    id: uuidv4(),
    name: "Match 3",
    path: "match3",
    description:
      "Match 3 is a puzzle game genre where players aim to align and swap adjacent tiles or objects to create groups of three or more identical items, causing them to disappear and score points.",
    implemented: false,
  },
  {
    id: uuidv4(),
    name: "Minesweeper",
    path: "minesweeper",
    description:
      "Minesweeper is a strategy puzzle game where players navigate a grid, uncovering hidden tiles while avoiding mines by using numerical hints provided by adjacent tiles.",
    implemented: false,
  },
  {
    id: uuidv4(),
    name: "Arkanoid",
    path: "arkanoid",
    description:
      "Arkanoid is a classic arcade game where players control a paddle at the bottom of the screen, bouncing a ball to break bricks and clear levels.",
    implemented: false,
  },
  {
    id: uuidv4(),
    name: "Sudoku",
    path: "sudoku",
    description:
      "Sudoku is a popular number puzzle game where players fill a grid with digits, ensuring that each row, column, and subgrid contains all the numbers from 1 to 9 without repetition.",
    implemented: false,
  },
  {
    id: uuidv4(),
    name: "Solitaire",
    path: "solitaire",
    description:
      "Solitaire is a single-player card game where the goal is to arrange a deck of cards in a specific order by following a set of rules and moves.",
    implemented: false,
  },
  {
    id: uuidv4(),
    name: "2048",
    path: "2048",
    description:
      "2048 is a addictive puzzle game where players combine numbered tiles by sliding them on a grid, aiming to reach the tile with the value of 2048.",
    implemented: false,
  },
];
