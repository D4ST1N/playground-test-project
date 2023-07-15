import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { GameName } from "@/helpers/generalTypes";
import { User } from "./user";

export interface GameHighScore {
  id: string;
  score: number;
  playerName: string;
  date: string;
}

export type HighScores = {
  [key in GameName]?: GameHighScore[];
};

export const useScoreStore = defineStore(
  "score",
  () => {
    const score = ref<HighScores>({});
    const current = ref<string>("");

    function setCurrentGameId(currentId: string) {
      current.value = currentId;
    }

    function setScore(user: User, gameName: GameName, gameScore: number, id: string) {
      const gameScores = score.value[gameName] || [];
      const existedScore = gameScores.find((score) => score.id === id);

      if (existedScore) {
        existedScore.score = gameScore;
        existedScore.date = new Date().toISOString();
        existedScore.playerName = user.name;
      } else {
        gameScores.push({
          id: id || uuidv4(),
          score: gameScore,
          playerName: user.name,
          date: new Date().toISOString(),
        });
      }

      gameScores.sort((a, b) => b.score - a.score);
      score.value[gameName] = gameScores.slice(0, 10);
    }

    function getGameHighScore(gameName: GameName): GameHighScore[] {
      return score.value[gameName] || [];
    }

    return { score, current, setScore, getGameHighScore, setCurrentGameId };
  },
  { persist: true },
);
