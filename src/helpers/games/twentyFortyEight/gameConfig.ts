export interface IGameConfig {
  fieldSize: number;
  startTiles: number;
  fourSpawnChance: number;
  winValue: number;
  moveAnimationTime: number;
  appearAnimationTime: number;
  tileSize: number;
  tileGap: number;
  tileRoundSize: number;
}

export const config: IGameConfig = {
  fieldSize: 4,
  startTiles: 2,
  fourSpawnChance: 0.1,
  winValue: 2048,
  moveAnimationTime: 100,
  appearAnimationTime: 100,
  tileSize: 100,
  tileGap: 20,
  tileRoundSize: 5,
};
