import _ from "lodash";
import { colorMapping, emptyCell, figuresMapping, generateField, getRandomFigure, getRandomFigureType } from "@/helpers/games/tetris/helpers";
import { CellType, TetrisFieldCell, TetrisFigure, TetrisFigureType, TetrisGameField } from "@/helpers/games/tetris/types";
import { brightenColor } from "@/helpers/generalHelpers";
import { GameStatus, Coordinates, HexCode } from "@/helpers/generalTypes";
import { config } from "@/helpers/games/tetris/gameConfig";

export interface TetrisGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  nextFigureCanvas: HTMLCanvasElement;
  nextFigureCtx: CanvasRenderingContext2D;
  scorePanelCanvas: HTMLCanvasElement;
  scorePanelCtx: CanvasRenderingContext2D;
  field: TetrisGameField;
  currentFigure: TetrisFigure;
  nextFigureType: TetrisFigureType;
  status: GameStatus;
  score: number;
  cellSize: number;
  fieldHeight: number;
  intervalId: number;

  start(): void;
  restart(): void;
  startFigureMove(): void;
  stopFigureMove(): void;
  moveFigure(): void;
  placeFigure(): void;
  handleMovement(event: KeyboardEvent): void;
  togglePause(): void;
  moveFigureLeft(): void;
  moveFigureRight(): void;
  checkIntersections(figureCells: TetrisFieldCell[][], figurePosition: Coordinates): boolean;
  rotateClockwise(): void;
  rotateCounterClockwise(): void;
  checkFilledRows(): void;
  updateScore(rowsCount: number): void;
  moveEmptyRowsDown(): void;
  render(): void;
  renderPasusedText(): void;
  renderDefeatText(): void;
  renderCell({ x, y }: Coordinates, color: HexCode): void;
  renderEmptyCell({ x, y }: Coordinates): void;
  renderNextFigure(figure: TetrisFigure): void;
  renderScore(): void;
}

export interface TetrisGamePayload {
  canvas: HTMLCanvasElement;
  nextFigureCanvas: HTMLCanvasElement;
  scorePanelCanvas: HTMLCanvasElement;
  cellSize?: number;
}

class TetrisImplementation implements TetrisGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  nextFigureCanvas: HTMLCanvasElement;
  nextFigureCtx: CanvasRenderingContext2D;
  scorePanelCanvas: HTMLCanvasElement;
  scorePanelCtx: CanvasRenderingContext2D;
  field: TetrisGameField = generateField(config.fieldWidth, config.fieldHeight);
  currentFigure: TetrisFigure = getRandomFigure();
  nextFigureType: TetrisFigureType = getRandomFigureType();
  status: GameStatus = GameStatus.NotStarted;
  cellSize: number = config.cellSize;
  fieldHeight: number;
  intervalId: number = 0;
  score: number = 0;
  boundedHandleMovement: (event: KeyboardEvent) => void;

  constructor({ canvas, nextFigureCanvas, scorePanelCanvas }: TetrisGamePayload) {
    this.canvas = canvas;
    this.nextFigureCanvas = nextFigureCanvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.nextFigureCtx = nextFigureCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.scorePanelCanvas = scorePanelCanvas;
    this.scorePanelCtx = scorePanelCanvas.getContext("2d") as CanvasRenderingContext2D;

    const [fieldColumn] = this.field;
    this.fieldHeight = fieldColumn.length;

    this.boundedHandleMovement = this.handleMovement.bind(this);
  }

  start() {
    this.status = GameStatus.Playing;
    this.currentFigure = getRandomFigure();
    this.nextFigureType = getRandomFigureType();
    this.render();
    this.renderScore();
    this.renderNextFigure(figuresMapping[this.nextFigureType]);

    this.startFigureMove();
  }

  restart() {
    this.field = generateField(config.fieldWidth, config.fieldHeight);
    this.score = 0;
    this.start();
  }

  startFigureMove(startKeydownListener: boolean = true) {
    if (startKeydownListener) {
      window.addEventListener('keydown', this.boundedHandleMovement);
    }
    this.intervalId = window.setInterval(this.moveFigure.bind(this), config.figureMoveInterval);
  }

  stopFigureMove(stopKeydownListener: boolean = true) {
    if (stopKeydownListener) {
      window.removeEventListener('keydown', this.boundedHandleMovement);
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
      return;
    }

    for (let x = 0; x < this.currentFigure.cells.length; x++) {
      const column = this.currentFigure.cells[x];
      // @ts-ignore
      const lastFilledCellIndex = column.findLastIndex((cell: TetrisFieldCell) => cell.isFilled);

      if (lastFilledCellIndex === -1) continue;

      const cellX = this.currentFigure.coordinates.x + x;
      const cellY = this.currentFigure.coordinates.y + lastFilledCellIndex + 1;
      const nextCell = this.field[cellX][cellY];

      if (nextCell.isFilled) {
        this.placeFigure();

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
      this.status = GameStatus.Defeat;

      return;
    }

    this.currentFigure = _.cloneDeep(figuresMapping[this.nextFigureType]);
    this.nextFigureType = getRandomFigureType();

    this.currentFigure.coordinates.y = -1;
    this.checkFilledRows();

    this.renderNextFigure(figuresMapping[this.nextFigureType]);
  }

  handleMovement(e: KeyboardEvent) {
    if (e.key === "a") {
      this.moveFigureLeft();
    } else if (e.key === "d") {
      this.moveFigureRight();
    } else if (e.key === "s") {
      this.moveFigure();
    } else if (e.key === "q") {
      this.rotateCounterClockwise();
    } else if (e.key === "e") {
      this.rotateClockwise();
    } else if (e.key === " ") {
      this.togglePause();
    }
  }

  togglePause() {
    if (this.status === GameStatus.Playing) {
      this.status = GameStatus.Paused;
      this.stopFigureMove(false);
    } else if (this.status === GameStatus.Paused) {
      this.status = GameStatus.Playing;
      this.startFigureMove();
    } else if (this.status === GameStatus.Defeat) {
      this.stopFigureMove();
      this.restart();
    }
  }

  moveFigureLeft() {
    if (this.status !== GameStatus.Playing) return;
    if (this.currentFigure.coordinates.x === 0) return;
    if (this.checkIntersections(this.currentFigure.cells, { ...this.currentFigure.coordinates, x: this.currentFigure.coordinates.x - 1 })) return;

    this.currentFigure.coordinates.x -= 1;
  }

  moveFigureRight() {
    if (this.status !== GameStatus.Playing) return;
    if (this.currentFigure.coordinates.x + this.currentFigure.cells.length === this.field.length) return;
    if (this.checkIntersections(this.currentFigure.cells, { ...this.currentFigure.coordinates, x: this.currentFigure.coordinates.x + 1 })) return;

    this.currentFigure.coordinates.x += 1;
  }

  checkIntersections(figureCells: TetrisFieldCell[][], figurePosition: Coordinates): boolean {
    const [figureColumn] = figureCells;
    const figureHeight = figureColumn.length;
    const yWithOffset = figurePosition.y + figureHeight;

    if (yWithOffset >= this.fieldHeight) {
      return true;
    }

    for (let x = 0; x < figureCells.length; x++) {
      const column = figureCells[x];

      for (let y = 0; y < column.length; y++) {
        const cell = column[y];

        if (!cell.isFilled) continue;

        if (figurePosition.x + x < 0 || figurePosition.x + x >= this.field.length || figurePosition.y + y < 0) return true;

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
  }

  rotateCounterClockwise() {
    if (this.status !== GameStatus.Playing) return;

    const newFigureCells: TetrisFieldCell[][] = [];

    this.currentFigure.cells.forEach((column, x, r) => {
      column.forEach((cell, y) => {
        newFigureCells[y] = newFigureCells[y] || [];
        newFigureCells[y][r.length - x - 1] = cell;
      });
    });

    if (this.checkIntersections(newFigureCells, this.currentFigure.coordinates)) return;

    this.currentFigure = {
      ...this.currentFigure,
      cells: newFigureCells,
    };
  }

  checkFilledRows() {
    const [column] = this.field;
    const fieldWdth = this.field.length;
    let filledRowsCount = 0;

    for (let y = 0; y < column.length; y++) {
      const isRowFilled = this.field.every((column) => column[y].isFilled);

      if (isRowFilled) {
        filledRowsCount += 1;
        for (let x = 0; x < fieldWdth; x++) {
          this.field[x][y] = {
            ...emptyCell,
          };
        }
      }
    }

    if (!filledRowsCount) return;

    this.updateScore(filledRowsCount);
    this.stopFigureMove();

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

  updateScore(filledRowsCount: number) {
    this.score += (2 ** filledRowsCount - 1) * 100;
    this.renderScore();
  }

  moveEmptyRowsDown() {
    const [column] = this.field;
    const fieldWdth = this.field.length;

    for (let y = column.length - 1; y > 0; y--) {
      const isRowEmpty = this.field.every((column) => !column[y].isFilled);

      if (isRowEmpty) {
        const tempRow = this.field.reduce((acc, column) => {
          acc.push(column[y]);

          return acc;
        }, []);

        for (let x = 0; x < fieldWdth; x++) {
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
      this.currentFigure.cells.forEach((column, x) => {
        column.forEach((cell, y) => {
          if (!cell.isFilled) return;

          this.renderCell({ x: x + this.currentFigure.coordinates.x, y: y + this.currentFigure.coordinates.y }, cell.color);
        });
      });
    }

    if (this.status === GameStatus.Paused) {
      this.renderPasusedText();
    }

    if (this.status === GameStatus.Defeat) {
      this.renderDefeatText();
    }

    if (this.status !== GameStatus.NotStarted) {
      window.requestAnimationFrame(this.render.bind(this));
    }
  }

  renderPasusedText() {
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
    this.ctx.fillText("Press \"Space\" to restart", this.canvas.width / 2, this.canvas.height / 2 + 40);
    this.ctx.strokeText("Press 'Space' to restart", this.canvas.width / 2, this.canvas.height / 2 + 40);
  }

  renderCell({ x, y }: Coordinates, color: HexCode, context: CanvasRenderingContext2D = this.ctx) {
    const gradient = context.createLinearGradient(x * this.cellSize, y * this.cellSize, x * this.cellSize, (y + 1) * this.cellSize);
    const leighterColor = brightenColor(color, 20);
    const darkerColor = brightenColor(color, -20);
    const lineWidth = this.cellSize / 12;
    gradient.addColorStop(0, leighterColor);
    gradient.addColorStop(0.4, leighterColor);
    gradient.addColorStop(0.6, darkerColor);
    gradient.addColorStop(1, darkerColor);

    context.fillStyle = gradient;
    context.strokeStyle = brightenColor(color, -40);
    context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    context.lineWidth = lineWidth;
    context.strokeRect(x * this.cellSize + lineWidth / 2, y * this.cellSize + lineWidth / 2, this.cellSize - lineWidth, this.cellSize - lineWidth);
    context.fillStyle = brightenColor(color, 40);
    context.fillRect(x * this.cellSize + this.cellSize / 4, y * this.cellSize + this.cellSize / 4, this.cellSize / 2, this.cellSize / 2);
    context.fillStyle = brightenColor(color, 30);
    context.fillRect(x * this.cellSize + this.cellSize / 4 + 2, y * this.cellSize + this.cellSize / 4 + 2, this.cellSize / 2 - 4, this.cellSize / 2 - 4);
  }

  renderEmptyCell({ x, y }: Coordinates) {
    this.ctx.strokeStyle = colorMapping[CellType.Empty];
    const lineWidth = this.cellSize / 12;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeRect(x * this.cellSize + lineWidth / 2, y * this.cellSize + lineWidth / 2, this.cellSize - lineWidth, this.cellSize - lineWidth);
  }

  renderNextFigure(figure: TetrisFigure) {
    const [column] = figure.cells;
    const width = figure.cells.length * this.cellSize;
    const height = column.length * this.cellSize;
    this.nextFigureCtx.canvas.width = width;
    this.nextFigureCtx.canvas.height = height;

    figure.cells.forEach((column, x) => {
      column.forEach((cell, y) => {
        if (!cell.isFilled) return;

        this.renderCell({ x, y }, cell.color, this.nextFigureCtx);
      });
    });
  }

  renderScore() {
    this.scorePanelCtx.clearRect(0, 0, this.scorePanelCtx.canvas.width, this.scorePanelCtx.canvas.height);
    this.scorePanelCtx.font = "normal 36px Arial";
    this.scorePanelCtx.strokeStyle = "#fff";
    this.scorePanelCtx.strokeText(`${this.score}`, 10, 30);
  }
}

export function createTetrisGame({ canvas, nextFigureCanvas, scorePanelCanvas }: TetrisGamePayload): TetrisGame {
  return new TetrisImplementation({ canvas, nextFigureCanvas, scorePanelCanvas });
}