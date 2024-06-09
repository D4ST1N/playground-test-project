import { v4 as uuidv4 } from "uuid";

import { GameInfo, GameName } from "@/helpers/generalTypes";

export const games: GameInfo[] = [
  {
    id: uuidv4(),
    name: GameName.Tetris,
    title: "Tetris",
    path: "tetris",
    description:
      "Tetris is a tile-matching puzzle video game originally designed and programmed by Soviet Russian software engineer Alexey Pajitnov in 1984.",
    implemented: true,
    cover: "/src/assets/img/cover/tetris.jpg",
  },
  {
    id: uuidv4(),
    name: GameName.Minesweeper,
    title: "Minesweeper",
    path: "minesweeper",
    description:
      "Minesweeper is a strategy puzzle game where players navigate a grid, uncovering hidden tiles while avoiding mines by using numerical hints provided by adjacent tiles.",
    implemented: true,
    cover: "/src/assets/img/cover/minesweeper.webp",
  },
  {
    id: uuidv4(),
    name: GameName.Sudoku,
    title: "Sudoku",
    path: "sudoku",
    description:
      "Sudoku is a popular number puzzle game where players fill a grid with digits, ensuring that each row, column, and subgrid contains all the numbers from 1 to 9 without repetition.",
    implemented: true,
    cover: "/src/assets/img/cover/sudoku.avif",
  },
  {
    id: uuidv4(),
    name: GameName.TwentyFortyEight,
    title: "2048",
    path: "twenty-forty-eight",
    description:
      "2048 is a addictive puzzle game where players combine numbered tiles by sliding them on a grid, aiming to reach the tile with the value of 2048.",
    implemented: true,
    cover: "/src/assets/img/cover/2048.webp",
  },
  {
    id: uuidv4(),
    name: GameName.Arkanoid,
    title: "Arkanoid",
    path: "arkanoid",
    description:
      "Arkanoid is a classic arcade game where players control a paddle at the bottom of the screen, bouncing a ball to break bricks and clear levels.",
    implemented: false,
    cover: "/src/assets/img/cover/arkanoid.webp",
  },
  {
    id: uuidv4(),
    name: GameName.Snake,
    title: "Snake",
    path: "snake",
    description:
      "Snake is the common name for a video game concept where the player maneuvers a line which grows in length, with the line itself being a primary obstacle.",
    implemented: false,
    cover: "/src/assets/img/cover/snake.jpg",
  },
  {
    id: uuidv4(),
    name: GameName.Pacman,
    title: "Pac-Man",
    path: "pacman",
    description:
      "Pac-Man is a classic arcade game where players control a yellow character, navigating through mazes, eating dots, and avoiding ghosts to achieve high scores.",
    implemented: false,
    cover: "/src/assets/img/cover/pac-man.jpg",
  },
  {
    id: uuidv4(),
    name: GameName.Match3,
    title: "Match 3",
    path: "match3",
    description:
      "Match 3 is a puzzle game genre where players aim to align and swap adjacent tiles or objects to create groups of three or more identical items, causing them to disappear and score points.",
    implemented: false,
    cover: "/src/assets/img/cover/match3.jpeg",
  },
  {
    id: uuidv4(),
    name: GameName.Solitaire,
    title: "Solitaire",
    path: "solitaire",
    description:
      "Solitaire is a single-player card game where the goal is to arrange a deck of cards in a specific order by following a set of rules and moves.",
    implemented: false,
    cover: "/src/assets/img/cover/solitaire.png",
  },
];
