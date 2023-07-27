import { v4 as uuidv4 } from "uuid";

import { IGameConfig, config as gameConfig } from "@/helpers/games/twentyFortyEight/gameConfig";
import {
  buildMovementGuideline,
  getCellContent,
  getCoordinatesByDirection,
  getEmptyField,
  getFarthestPosition,
  getRandomFreeCellCoordinates,
  getRandomTileValue,
  getTileColor,
  getTileFontSize,
  getTileTextColor,
  isCustomConfig,
  isSamePosition,
  isMergeAvailable,
  getFreeCells,
} from "@/helpers/games/twentyFortyEight/helpers";
import {
  Direction,
  GameField,
  TwentyFortyEightKeyCode,
} from "@/helpers/games/twentyFortyEight/types";
import { Tile } from "@/components/Games/TwentyFortyEight/Game/Tile";
import { soundFabric, timeout } from "@/helpers/generalHelpers";
import { useTwentyFortyEightStore } from "@/store/games/twentyFortyEight";
import { GameStatus } from "@/helpers/generalTypes";

const gameAudios = soundFabric([
  {
    key: "swipe",
    sound: "/src/assets/sounds/games/2048/swipe.mp3",
    volume: 0.4,
  },
]);

export class TwentyFortyEight {
  ctx: CanvasRenderingContext2D;
  field: GameField = [];
  gameStore: ReturnType<typeof useTwentyFortyEightStore>;
  config: IGameConfig;
  scoreId: string;
  isCustom: boolean;
  checkWinCondition: boolean;

  constructor(
    public canvas: HTMLCanvasElement,
    config: Partial<IGameConfig> = {},
  ) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.gameStore = useTwentyFortyEightStore();
    this.scoreId = uuidv4();
    this.gameStore.setCurrentGameId(this.scoreId);
    this.config = { ...gameConfig, ...config };
    this.isCustom = isCustomConfig(this.config);
    this.checkWinCondition = true;
  }

  get gameStopped() {
    return (
      this.gameStore.status === GameStatus.Victory || this.gameStore.status === GameStatus.Defeat
    );
  }

  public updateConfig(config: Partial<IGameConfig>) {
    this.config = { ...this.config, ...config };
  }

  public start() {
    this.gameStore.clearScore();
    this.gameStore.updateStatus(GameStatus.Playing);
    this.field = getEmptyField(this.config.fieldSize, this.config.fieldSize);
    this.addInitialTiles();
    this.render();

    window.addEventListener("keydown", this.handleMovement.bind(this));
  }

  restart() {
    this.scoreId = uuidv4();
    this.gameStore.setCurrentGameId(this.scoreId);
    this.gameStore.updateStatus(GameStatus.Playing);
    this.gameStore.clearScore();
    this.field = getEmptyField(this.config.fieldSize, this.config.fieldSize);
    this.checkWinCondition = true;
    this.addInitialTiles();
  }

  addInitialTiles() {
    for (let i = 0; i < this.config.startTiles; i++) {
      this.addNewTile();
    }
  }

  getNewTile() {
    return new Tile(
      getRandomTileValue(this.config),
      getRandomFreeCellCoordinates(this.field),
      this.config,
    );
  }

  addNewTile() {
    const newTile = this.getNewTile();
    this.field[newTile.position.x][newTile.position.y] = newTile;
    newTile.appear();
  }

  handleMovement(e: KeyboardEvent) {
    if (this.gameStopped) return;

    switch (e.code) {
      case TwentyFortyEightKeyCode.Left:
      case TwentyFortyEightKeyCode.LeftArrow:
        this.moveTilesLeft();
        break;
      case TwentyFortyEightKeyCode.Right:
      case TwentyFortyEightKeyCode.RightArrow:
        this.moveTilesRight();
        break;
      case TwentyFortyEightKeyCode.Down:
      case TwentyFortyEightKeyCode.DownArrow:
        this.moveTilesDown();
        break;
      case TwentyFortyEightKeyCode.Up:
      case TwentyFortyEightKeyCode.UpArrow:
        this.moveTilesUp();
        break;
      default: {
        return;
      }
    }
  }

  async moveTilesLeft() {
    this.addTileIfAnyMove(this.moveTile(Direction.Left));
  }

  async moveTilesRight() {
    this.addTileIfAnyMove(this.moveTile(Direction.Right));
  }

  moveTilesDown() {
    this.addTileIfAnyMove(this.moveTile(Direction.Down));
  }

  moveTilesUp() {
    this.addTileIfAnyMove(this.moveTile(Direction.Up));
  }

  moveTile(direction: Direction): boolean {
    const movementCoordinates = getCoordinatesByDirection(direction);
    const movementGuideline = buildMovementGuideline(movementCoordinates, this.config);
    let anyMove = false;

    movementGuideline.x.forEach((x) => {
      movementGuideline.y.forEach((y) => {
        const currentCell = { x, y };
        const currentTile = getCellContent(this.field, currentCell, this.config);

        if (!currentTile) return;

        const { farthestPosition, nextPosition } = getFarthestPosition(
          this.field,
          currentCell,
          movementCoordinates,
          this.config,
        );
        const nextTile = getCellContent(this.field, nextPosition, this.config);

        if (nextTile && nextTile.value === currentTile.value && !nextTile.isMerged) {
          const newPosition = { ...nextPosition };

          currentTile.merge();
          currentTile.value *= 2;
          this.field[currentCell.x][currentCell.y] = null;
          this.field[newPosition.x][newPosition.y] = currentTile;

          currentTile.move(newPosition);
          this.updateScore(currentTile.value);

          if (this.checkWinCondition && currentTile.value === this.config.winValue) {
            this.setIsWin();
          }
        } else {
          this.field[currentCell.x][currentCell.y] = null;
          this.field[farthestPosition.x][farthestPosition.y] = currentTile;

          currentTile.move(farthestPosition);
        }

        if (!isSamePosition(currentCell, currentTile.nextPosition!)) {
          anyMove = true;
        }
      });
    });

    return anyMove;
  }

  updateScore(score: number) {
    this.gameStore.setScore(score, this.scoreId, this.isCustom);
  }

  setIsWin() {
    this.checkWinCondition = false;
    this.gameStore.updateStatus(GameStatus.Victory);
  }

  async addTileIfAnyMove(moved: boolean) {
    if (!moved) return;

    gameAudios.swipe.playMultiple();
    await timeout(this.config.moveAnimationTime * 1.1);
    this.addNewTile();

    const mergeAvailable = isMergeAvailable(this.field, this.config);
    const freeCells = getFreeCells(this.field);

    if (!mergeAvailable && !freeCells.length) {
      this.gameStore.updateStatus(GameStatus.Defeat);
    }
  }

  render() {
    this.renderField();

    window.requestAnimationFrame(this.render.bind(this));
  }

  renderField() {
    this.canvas.width =
      this.config.fieldSize * (this.config.tileSize + this.config.tileGap) + this.config.tileGap;
    this.canvas.height =
      this.config.fieldSize * (this.config.tileSize + this.config.tileGap) + this.config.tileGap;
    this.ctx.fillStyle = "#bbada0";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.field.forEach((column, x) => {
      column.forEach((_, y) => {
        this.renderFieldCell(x, y);
      });
    });
    // prevent rendering tiles before field
    this.field.forEach((column, x) => {
      column.forEach((_, y) => {
        if (this.field[x][y]) {
          this.renderTile(this.field[x][y] as Tile);
        }
      });
    });
  }

  renderFieldCell(x: number, y: number) {
    this.ctx.strokeStyle = "#cdc1b4";
    this.ctx.fillStyle = "#cdc1b4";
    this.ctx.beginPath();
    this.ctx.roundRect(
      x * (this.config.tileSize + this.config.tileGap) + this.config.tileGap,
      y * (this.config.tileSize + this.config.tileGap) + this.config.tileGap,
      this.config.tileSize,
      this.config.tileSize,
      [this.config.tileRoundSize],
    );
    this.ctx.stroke();
    this.ctx.fill();
  }

  renderTile(tile: Tile) {
    if (!tile.position) return;

    const x = tile.coordinates.x;
    const y = tile.coordinates.y;
    const sizeOffset = (this.config.tileSize - tile.size) / 2;
    const textSizeMultiplier = tile.size / this.config.tileSize;

    this.ctx.strokeStyle = getTileColor(tile.value);
    this.ctx.fillStyle = getTileColor(tile.value);
    this.ctx.beginPath();
    this.ctx.roundRect(x + sizeOffset, y + sizeOffset, tile.size, tile.size, [
      this.config.tileRoundSize,
    ]);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.fillStyle = getTileTextColor(tile.value);
    this.ctx.font = `bold ${getTileFontSize(tile.value, this.config) * textSizeMultiplier}px Arial`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      `${tile.value}`,
      x + sizeOffset + tile.size / 2,
      y + sizeOffset + tile.size / 2,
    );
  }
}
