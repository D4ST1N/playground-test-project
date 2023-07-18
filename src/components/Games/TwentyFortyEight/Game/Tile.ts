import { IGameConfig } from "@/helpers/games/twentyFortyEight/gameConfig";
import { getAnimationProgress, getCoordinates } from "@/helpers/games/twentyFortyEight/helpers";
import { Coordinates } from "@/helpers/generalTypes";

export class Tile {
  private moveAnimationStartTime: number | null = null;
  private appearAnimationStartTime: number | null = Date.now();
  public isNew: boolean = true;
  public nextPosition: Coordinates | null = null;
  public isMerged: boolean = false;

  constructor(
    public value: number,
    public position: Coordinates,
    public config: IGameConfig,
  ) {}

  get size(): number {
    if (!this.isNew) return this.config.tileSize;

    const animationProgress = getAnimationProgress(
      this.appearAnimationStartTime!,
      this.config.appearAnimationTime,
    );

    if (animationProgress >= 1) {
      this.isNew = false;
      this.appearAnimationStartTime = null;

      return this.config.tileSize;
    } else {
      return this.config.tileSize * animationProgress;
    }
  }

  get coordinates(): Coordinates {
    if (!this.moveAnimationStartTime) {
      return getCoordinates(this.position, this.config);
    }

    const animationProgress = getAnimationProgress(
      this.moveAnimationStartTime,
      this.config.moveAnimationTime,
    );

    if (animationProgress >= 1) {
      this.moveAnimationStartTime = null;
      this.position = this.nextPosition!;
      this.nextPosition = null;
      this.isMerged = false;

      return getCoordinates(this.position, this.config);
    }

    const nextCoordinates = getCoordinates(this.nextPosition!, this.config);
    const currentCoordinates = getCoordinates(this.position, this.config);
    const x = currentCoordinates.x + (nextCoordinates.x - currentCoordinates.x) * animationProgress;
    const y = currentCoordinates.y + (nextCoordinates.y - currentCoordinates.y) * animationProgress;

    return { x, y };
  }

  appear() {
    this.appearAnimationStartTime = Date.now();
  }

  move(nextPosition: Coordinates) {
    this.nextPosition = nextPosition;
    this.moveAnimationStartTime = Date.now();
  }

  merge() {
    this.isMerged = true;
  }
}
