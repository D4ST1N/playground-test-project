import { GameHighScore } from "@/store/games/tetris";

export const migrations = {
  "0.0.1": () => {
    const scoresData = localStorage.getItem(`score`);

    if (!scoresData) return;

    const scores = JSON.parse(scoresData);
    const scoresByGame = scores.score.Tetris;

    if (!scoresByGame) return;

    return scoresByGame as GameHighScore[];
  },
};
