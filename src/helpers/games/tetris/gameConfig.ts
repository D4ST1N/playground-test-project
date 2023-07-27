export const config = {
  fieldWidth: 10,
  fieldHeight: 20,
  cellSize: 42,
  figureMoveInterval: 550,
  moveIntervalIncrease: {
    1: 1,
    2: 0.85,
    3: 0.6,
  },
  rowFallInterval: 250,
  rowScoreIncreasePercentage: 5,
  maxLevel: 3,
  gameLevelRows: {
    1: 0,
    2: 15,
    3: 50,
  } as Record<string, number>,
};
