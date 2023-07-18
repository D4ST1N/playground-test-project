import { v4 as uuidv4 } from "uuid";

import { IGameConfig, config as gameConfig } from "@/helpers/games/twentyFortyEight/gameConfig";
import {
  getEmptyField,
  getRandomFreeCellCoordinates,
  getRandomTileValue,
  getTileColor,
  getTileFontSize,
  getTileTextColor,
  isCustomConfig,
  moveTile,
} from "@/helpers/games/twentyFortyEight/helpers";
import {
  Direction,
  GameField,
  TwentyFortyEightKeyCode,
} from "@/helpers/games/twentyFortyEight/types";
import { Tile } from "@/components/Games/TwentyFortyEight/Game/Tile";
import { timeout } from "@/helpers/generalHelpers";
import { useTwentyFortyEightStore } from "@/store/games/twentyFortyEight";
import { GameStatus } from "@/helpers/generalTypes";

export class TwentyFortyEight {
  ctx: CanvasRenderingContext2D;
  field: GameField;
  gameStore: ReturnType<typeof useTwentyFortyEightStore>;
  config: IGameConfig;
  scoreId: string;
  isCustom: boolean;

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
    this.field = getEmptyField(this.config.fieldSize, this.config.fieldSize);
  }

  public start() {
    this.gameStore.updateStatus(GameStatus.Playing);
    this.addInitialTiles();
    this.render();

    window.addEventListener("keydown", this.handleMovement.bind(this));
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
    this.addTileIfAnyMove(
      moveTile(
        this.field,
        Direction.Left,
        this.config,
        this.updateScore.bind(this),
        this.setIsWin.bind(this),
      ),
    );
  }

  async moveTilesRight() {
    this.addTileIfAnyMove(
      moveTile(
        this.field,
        Direction.Right,
        this.config,
        this.updateScore.bind(this),
        this.setIsWin.bind(this),
      ),
    );
  }

  moveTilesDown() {
    this.addTileIfAnyMove(
      moveTile(
        this.field,
        Direction.Down,
        this.config,
        this.updateScore.bind(this),
        this.setIsWin.bind(this),
      ),
    );
  }

  moveTilesUp() {
    this.addTileIfAnyMove(
      moveTile(
        this.field,
        Direction.Up,
        this.config,
        this.updateScore.bind(this),
        this.setIsWin.bind(this),
      ),
    );
  }

  updateScore(score: number) {
    this.gameStore.setScore(score, this.scoreId, this.isCustom);
  }

  setIsWin() {
    this.gameStore.updateStatus(GameStatus.Victory);
  }

  async addTileIfAnyMove(moved: boolean) {
    if (!moved) return;

    await timeout(this.config.moveAnimationTime * 1.1);
    this.addNewTile();
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
