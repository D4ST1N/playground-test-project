import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import {
  colorMapping,
  emptyCell,
  figureScoreMapping,
  figuresMapping,
  generateField,
  getRandomFigure,
  getRandomFigureType,
} from "@/helpers/games/tetris/helpers";
import {
  CellType,
  TetrisFieldCell,
  TetrisFigure,
  TetrisFigureType,
  TetrisGameDIfficulty,
  TetrisGameField,
} from "@/helpers/games/tetris/types";
import { brightenColor, soundFabric } from "@/helpers/generalHelpers";
import { GameStatus, Coordinates, HexCode, KeyboardKeyCode } from "@/helpers/generalTypes";
import { config } from "@/helpers/games/tetris/gameConfig";
import { useUserStore } from "@/store/user";
import { useTetrisStore } from "@/store/games/tetris";

const soundEffects = soundFabric([
  {
    key: "clear",
    sound: "/src/assets/sounds/games/tetris/clear.mp3",
    volume: 0.4,
  },
  {
    key: "move",
    sound: "/src/assets/sounds/games/tetris/move.m4a",
    volume: 0.33,
  },
  {
    key: "rotate",
    sound: "/src/assets/sounds/games/tetris/rotate.m4a",
    volume: 0.75,
  },
  {
    key: "place",
    sound: "/src/assets/sounds/games/tetris/place.m4a",
    volume: 0.9,
  },
  {
    key: "lose",
    sound: "/src/assets/sounds/games/tetris/lose.mp3",
    volume: 1,
  },
]);

export interface TetrisGamePayload {
  canvas: HTMLCanvasElement;
  nextFigureCanvas: HTMLCanvasElement;
  cellSize?: number;
}

export class TetrisGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  nextFigureCanvas: HTMLCanvasElement;
  nextFigureCtx: CanvasRenderingContext2D;
  field: TetrisGameField = generateField(config.fieldWidth, config.fieldHeight);
  currentFigure: TetrisFigure = getRandomFigure();
  nextFigureType: TetrisFigureType = getRandomFigureType();
  status: GameStatus = GameStatus.NotStarted;
  cellSize: number = config.cellSize;
  fieldHeight: number;
  difficulty: TetrisGameDIfficulty;
  moveSpeed: number = config.figureMoveInterval;
  rowsFilled: number = 0;
  intervalId: number = 0;
  score: number = 0;
  userStore;
  tetrisStore;
  scoreId: string;
  boundedHandleMovement: (event: KeyboardEvent) => void;

  constructor({ canvas, nextFigureCanvas }: TetrisGamePayload) {
    this.canvas = canvas;
    this.nextFigureCanvas = nextFigureCanvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.nextFigureCtx = nextFigureCanvas.getContext("2d") as CanvasRenderingContext2D;

    const [fieldColumn] = this.field;
    this.fieldHeight = fieldColumn.length;
    this.difficulty = TetrisGameDIfficulty.Easy;

    this.userStore = useUserStore();
    this.tetrisStore = useTetrisStore();
    this.scoreId = uuidv4();
    this.tetrisStore.setCurrentGameId(this.scoreId);

    // to remove event listener we need to pass exact same function. When we use .bind on function
    // it returns new function, so we can't pass functionName.bind(this) to remove event listener
    // as this will not work. Save bound function will solve the issue
    this.boundedHandleMovement = this.handleMovement.bind(this);
  }

  get currentFigurePhantom() {
    const { cells, coordinates } = this.currentFigure;
    const figureHeight = cells[0].length;

    const y = cells.reduce((minY, column, x) => {
      const lastFilledCellIndex = column.findLastIndex((cell: TetrisFieldCell) => cell.isFilled);

      if (lastFilledCellIndex === -1) return minY;

      const cellX = this.currentFigure.coordinates.x + x;
      const heightFromTheTop = coordinates.y + lastFilledCellIndex + 1;
      let closestFilledCell = this.field[cellX]
        .slice(heightFromTheTop)
        .findIndex((cell: TetrisFieldCell) => cell.isFilled);

      if (closestFilledCell === -1) return minY;

      closestFilledCell += heightFromTheTop;
      const cellY = closestFilledCell - (lastFilledCellIndex + 1);
      if (cellY < minY) {
        return cellY;
      }

      return minY;
    }, this.fieldHeight - figureHeight);

    return {
      cells,
      coordinates: { ...coordinates, y },
    };
  }

  start() {
    this.status = GameStatus.Playing;
    this.currentFigure = getRandomFigure();
    this.nextFigureType = getRandomFigureType();
    this.render();
    this.renderNextFigure(figuresMapping[this.nextFigureType]);
    this.tetrisStore.addNewFigure(this.currentFigure.type);
    this.tetrisStore.startMusic();
    this.tetrisStore.setGameStatus(this.status);

    this.startFigureMove();
  }

  restart() {
    this.field = generateField(config.fieldWidth, config.fieldHeight);
    this.score = 0;
    this.scoreId = uuidv4();
    this.tetrisStore.setCurrentGameId(this.scoreId);
    this.tetrisStore.setScore(this.score, this.scoreId);
    this.tetrisStore.reset();
    this.start();
  }

  startFigureMove(startKeydownListener: boolean = true) {
    if (startKeydownListener) {
      window.addEventListener("keydown", this.boundedHandleMovement);
    }

    this.intervalId = window.setInterval(this.moveFigure.bind(this), this.moveSpeed);
  }

  stopFigureMove(stopKeydownListener: boolean = true) {
    if (stopKeydownListener) {
      window.removeEventListener("keydown", this.boundedHandleMovement);
    }

    window.clearInterval(this.intervalId);
  }

  moveFigure() {
    if (this.status !== GameStatus.Playing) return;

    if (!this.currentFigure) return;

    const [figureColumn] = this.currentFigure.cells;
    const figureHeight = figureColumn.length;
    const yWithOffset = this.currentFigure.coordinates.y + figureHeight;

    if (yWithOffset >= this.fieldHeight) {
      this.placeFigure();
      soundEffects.place.playMultiple();
      return;
    }

    for (let x = 0; x < this.currentFigure.cells.length; x++) {
      const column = this.currentFigure.cells[x];
      const lastFilledCellIndex = column.findLastIndex((cell: TetrisFieldCell) => cell.isFilled);

      if (lastFilledCellIndex === -1) continue;

      const cellX = this.currentFigure.coordinates.x + x;
      const cellY = this.currentFigure.coordinates.y + lastFilledCellIndex + 1;
      const nextCell = this.field[cellX][cellY];

      if (nextCell.isFilled) {
        this.placeFigure();
        soundEffects.place.playMultiple();

        return;
      }
    }

    this.currentFigure.coordinates.y += 1;
  }

  placeFigure() {
    this.currentFigure.cells.forEach((column, x) => {
      column.forEach((cell, y) => {
        if (!cell.isFilled) return;

        this.field[x + this.currentFigure.coordinates.x][y + this.currentFigure.coordinates.y] = {
          color: cell.color,
          isFilled: true,
        };
      });
    });

    if (this.currentFigure.coordinates.y < 0) {
      this.loseGame();

      return;
    }

    const row = config.fieldHeight - this.currentFigure.coordinates.y - 1;
    this.updateScore({ row, figure: this.currentFigure });

    this.currentFigure = _.cloneDeep(figuresMapping[this.nextFigureType]);
    this.nextFigureType = getRandomFigureType();

    this.tetrisStore.addNewFigure(this.currentFigure.type);

    this.currentFigure.coordinates.y = -1;
    this.checkFilledRows();

    this.renderNextFigure(figuresMapping[this.nextFigureType]);
  }

  loseGame() {
    this.status = GameStatus.Defeat;
    this.tetrisStore.setGameStatus(this.status);
    this.tetrisStore.stopMusic();
    soundEffects.lose.play();
  }

  handleMovement(e: KeyboardEvent) {
    switch (e.code) {
      case KeyboardKeyCode.Left:
      case KeyboardKeyCode.ArrowLeft:
        this.moveFigureLeft();
        break;
      case KeyboardKeyCode.Right:
      case KeyboardKeyCode.ArrowRight:
        this.moveFigureRight();
        break;
      case KeyboardKeyCode.Down:
      case KeyboardKeyCode.ArrowDown:
        this.moveFigure();
        if (this.status === GameStatus.Playing) soundEffects.move.playMultiple();
        break;
      case KeyboardKeyCode.Up:
      case KeyboardKeyCode.ArrowUp:
        this.rotateClockwise();
        break;
      case KeyboardKeyCode.Space: {
        this.togglePause();
        break;
      }
      default: {
        return;
      }
    }
  }

  togglePause() {
    switch (this.status) {
      case GameStatus.Playing: {
        this.status = GameStatus.Paused;
        this.tetrisStore.setGameStatus(this.status);
        this.stopFigureMove(false);
        break;
      }
      case GameStatus.Paused: {
        this.status = GameStatus.Playing;
        this.tetrisStore.setGameStatus(this.status);
        this.startFigureMove();
        break;
      }
      // Restart game if Space pressed after defeat
      case GameStatus.Defeat: {
        this.stopFigureMove();
        this.restart();
        break;
      }
      default: {
        return;
      }
    }
  }

  moveFigureLeft() {
    if (this.status !== GameStatus.Playing) return;
    if (this.currentFigure.coordinates.x === 0) return;
    if (
      this.checkIntersections(this.currentFigure.cells, {
        ...this.currentFigure.coordinates,
        x: this.currentFigure.coordinates.x - 1,
      })
    )
      return;

    this.currentFigure.coordinates.x -= 1;
    soundEffects.move.playMultiple();
  }

  moveFigureRight() {
    if (this.status !== GameStatus.Playing) return;
    if (this.currentFigure.coordinates.x + this.currentFigure.cells.length === this.field.length)
      return;
    if (
      this.checkIntersections(this.currentFigure.cells, {
        ...this.currentFigure.coordinates,
        x: this.currentFigure.coordinates.x + 1,
      })
    )
      return;

    this.currentFigure.coordinates.x += 1;
    soundEffects.move.playMultiple();
  }

  checkIntersections(figureCells: TetrisFieldCell[][], figurePosition: Coordinates): boolean {
    const [figureColumn] = figureCells;
    const figureHeight = figureColumn.length;
    const yWithOffset = figurePosition.y + figureHeight;

    if (yWithOffset > this.fieldHeight) {
      return true;
    }

    for (let x = 0; x < figureCells.length; x++) {
      const column = figureCells[x];

      for (let y = 0; y < column.length; y++) {
        const cell = column[y];

        if (!cell.isFilled) continue;

        if (
          figurePosition.x + x < 0 ||
          figurePosition.x + x >= this.field.length ||
          figurePosition.y + y < 0
        )
          return true;

        const cellX = figurePosition.x + x;
        const cellY = figurePosition.y + y;
        const fieldCell = this.field[cellX][cellY];

        if (fieldCell.isFilled) {
          return true;
        }
      }
    }

    return false;
  }

  rotateClockwise() {
    if (this.status !== GameStatus.Playing) return;

    const newFigureCells: TetrisFieldCell[][] = [];

    this.currentFigure.cells.forEach((column, x) => {
      column.forEach((cell, j, c) => {
        newFigureCells[c.length - j - 1] = newFigureCells[c.length - j - 1] || [];
        newFigureCells[c.length - j - 1][x] = cell;
      });
    });

    if (this.checkIntersections(newFigureCells, this.currentFigure.coordinates)) return;

    this.currentFigure = {
      ...this.currentFigure,
      cells: newFigureCells,
    };
    soundEffects.rotate.playMultiple();
  }

  checkFilledRows() {
    const [column] = this.field;
    const fieldWidth = this.field.length;
    let filledRowsCount = 0;
    let firstFilledRow = 0;

    for (let y = 0; y < column.length; y++) {
      const isRowFilled = this.field.every((column) => column[y].isFilled);

      if (isRowFilled) {
        if (filledRowsCount === 0) {
          firstFilledRow = column.length - y - 1;
        }
        filledRowsCount += 1;
        for (let x = 0; x < fieldWidth; x++) {
          this.field[x][y] = {
            ...emptyCell,
          };
        }
      }
    }

    if (!filledRowsCount) return;

    this.updateScore({ row: firstFilledRow, filledRowsCount });
    this.stopFigureMove();
    soundEffects.clear.playMultiple();

    // Make "number of filled rows" iterations to move all rows above to correct position
    const loop = () => {
      setTimeout(() => {
        if (filledRowsCount > 0) {
          filledRowsCount -= 1;
          this.moveEmptyRowsDown();
          loop();
        } else {
          this.currentFigure.coordinates.y = 0;
          this.startFigureMove();
        }
      }, config.rowFallInterval);
    };

    loop();
  }

  updateScore({
    row,
    filledRowsCount = 0,
    figure = null,
  }: {
    row: number;
    filledRowsCount?: number;
    figure?: TetrisFigure | null;
  }) {
    let rowsScore = 0;
    let figureScore = 0;

    const rowMultiplier = (1 + config.rowScoreIncreasePercentage / 100) ** row;
    let difficultyMultiplier = 1;

    if (this.difficulty === TetrisGameDIfficulty.Medium) {
      difficultyMultiplier = 1.5;
    } else if (this.difficulty === TetrisGameDIfficulty.Hard) {
      difficultyMultiplier = 2.5;
    }

    if (filledRowsCount) {
      // 1 filled row - 100 points
      // 2 filled rows - 300 points
      // 3 filled rows - 700 points
      // 4 filled rows - 1500 points
      this.rowsFilled += filledRowsCount;
      const baseFilledRowsScore = (2 ** filledRowsCount - 1) * 100;
      rowsScore = Math.round(baseFilledRowsScore * rowMultiplier * difficultyMultiplier);
      this.tetrisStore.increaseClearedRows(filledRowsCount);
      this.increaseDifficulty();
    }

    if (figure !== null) {
      const baseFigureScore = figureScoreMapping[figure.type];
      figureScore = Math.round(baseFigureScore * rowMultiplier * difficultyMultiplier);
    }

    this.score += figureScore;
    this.score += rowsScore;
    this.tetrisStore.setScore(this.score, this.scoreId);
  }

  increaseDifficulty() {
    if (this.difficulty === TetrisGameDIfficulty.Hard) return;

    if (
      this.difficulty === TetrisGameDIfficulty.Easy &&
      this.rowsFilled >= config.gameLevelRows[2]
    ) {
      this.difficulty = TetrisGameDIfficulty.Medium;
      this.tetrisStore.increaseDifficulty();
      this.moveSpeed = config.figureMoveInterval * config.moveIntervalIncrease[2];
      return;
    }

    if (
      this.difficulty === TetrisGameDIfficulty.Medium &&
      this.rowsFilled >= config.gameLevelRows[3]
    ) {
      this.difficulty = TetrisGameDIfficulty.Hard;
      this.moveSpeed = config.figureMoveInterval * config.moveIntervalIncrease[3];
      this.tetrisStore.increaseDifficulty();
    }
  }

  moveEmptyRowsDown() {
    const [column] = this.field;
    const fieldWidth = this.field.length;

    for (let y = column.length - 1; y > 0; y--) {
      const isRowEmpty = this.field.every((column) => !column[y].isFilled);

      if (isRowEmpty) {
        const tempRow = this.field.reduce((acc, column) => {
          acc.push(column[y]);

          return acc;
        }, []);

        for (let x = 0; x < fieldWidth; x++) {
          this.field[x][y] = this.field[x][y - 1];
          this.field[x][y - 1] = tempRow[x];
        }
      }
    }
  }

  render() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.field.forEach((column, x) => {
      column.forEach((cell, y) => {
        if (cell.isFilled) {
          this.renderCell({ x, y }, cell.color);
        } else {
          this.renderEmptyCell({ x, y });
        }
      });
    });

    if (this.currentFigure.coordinates.y >= 0) {
      const { x: phantomX, y: phantomY } = this.currentFigurePhantom.coordinates;
      this.currentFigurePhantom.cells.forEach((column, x) => {
        column.forEach((cell, y) => {
          if (!cell.isFilled) return;

          this.renderPhantomCell({
            x: x + phantomX,
            y: y + phantomY,
          });
        });
      });

      this.currentFigure.cells.forEach((column, x) => {
        column.forEach((cell, y) => {
          if (!cell.isFilled) return;

          this.renderCell(
            { x: x + this.currentFigure.coordinates.x, y: y + this.currentFigure.coordinates.y },
            cell.color,
          );
        });
      });
    }

    if (this.status === GameStatus.Paused) {
      this.renderPausedText();
    }

    if (this.status === GameStatus.Defeat) {
      this.renderDefeatText();
    }

    if (this.status !== GameStatus.NotStarted) {
      window.requestAnimationFrame(this.render.bind(this));
    }
  }

  renderPausedText() {
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "bold 40px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Paused", this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;
    this.ctx.strokeText("Paused", this.canvas.width / 2, this.canvas.height / 2);
  }

  renderDefeatText() {
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "bold 40px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Defeat", this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;
    this.ctx.strokeText("Defeat", this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillText(
      'Press "Space" to restart',
      this.canvas.width / 2,
      this.canvas.height / 2 + 40,
    );
    this.ctx.strokeText(
      'Press "Space" to restart',
      this.canvas.width / 2,
      this.canvas.height / 2 + 40,
    );
  }

  renderCell(
    { x, y }: Coordinates,
    color: HexCode,
    context: CanvasRenderingContext2D = this.ctx,
    size = this.cellSize,
  ) {
    const gradient = context.createLinearGradient(x * size, y * size, x * size, (y + 1) * size);
    const lighterColor = brightenColor(color, 20);
    const darkerColor = brightenColor(color, -20);
    const lineWidth = size / 12;
    gradient.addColorStop(0, lighterColor);
    gradient.addColorStop(0.4, lighterColor);
    gradient.addColorStop(0.6, darkerColor);
    gradient.addColorStop(1, darkerColor);

    context.fillStyle = gradient;
    context.strokeStyle = brightenColor(color, -40);
    context.fillRect(x * size, y * size, size, size);
    context.lineWidth = lineWidth;
    context.strokeRect(
      x * size + lineWidth / 2,
      y * size + lineWidth / 2,
      size - lineWidth,
      size - lineWidth,
    );
    context.fillStyle = brightenColor(color, 40);
    context.fillRect(x * size + size / 4, y * size + size / 4, size / 2, size / 2);
    context.fillStyle = brightenColor(color, 30);
    context.fillRect(x * size + size / 4 + 2, y * size + size / 4 + 2, size / 2 - 4, size / 2 - 4);
  }

  renderPhantomCell({ x, y }: Coordinates) {
    const lineWidth = this.cellSize / 12;
    this.ctx.strokeStyle = "#fff5";
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeRect(
      x * this.cellSize + lineWidth / 2,
      y * this.cellSize + lineWidth / 2,
      this.cellSize - lineWidth,
      this.cellSize - lineWidth,
    );
  }

  renderEmptyCell({ x, y }: Coordinates) {
    this.ctx.strokeStyle = colorMapping[CellType.Empty];
    const lineWidth = this.cellSize / 12;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeRect(
      x * this.cellSize + lineWidth / 2,
      y * this.cellSize + lineWidth / 2,
      this.cellSize - lineWidth,
      this.cellSize - lineWidth,
    );
  }

  renderNextFigure(figure: TetrisFigure) {
    const [column] = figure.cells;
    const width = (figure.cells.length * this.cellSize) / 2;
    const height = (column.length * this.cellSize) / 2;
    this.nextFigureCtx.canvas.width = width;
    this.nextFigureCtx.canvas.height = height;

    figure.cells.forEach((column, x) => {
      column.forEach((cell, y) => {
        if (!cell.isFilled) return;

        this.renderCell({ x, y }, cell.color, this.nextFigureCtx, this.cellSize / 2);
      });
    });
  }
}
