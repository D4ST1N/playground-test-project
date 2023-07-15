import { NumberOfFigures, TetrisFigureType } from "@/helpers/games/tetris/types";
import { defineStore } from "pinia";
import { ref } from "vue";

const initialNumbers: NumberOfFigures = {
  [TetrisFigureType.I]: 0,
  [TetrisFigureType.J]: 0,
  [TetrisFigureType.L]: 0,
  [TetrisFigureType.O]: 0,
  [TetrisFigureType.S]: 0,
  [TetrisFigureType.T]: 0,
  [TetrisFigureType.Z]: 0,
};

export const useTetrisStore = defineStore("tetris", () => {
  const numberOfFigures = ref<NumberOfFigures>({ ...initialNumbers });

  function addNewFigure(figureType: TetrisFigureType) {
    numberOfFigures.value[figureType] += 1;
  }

  function reset() {
    numberOfFigures.value = { ...initialNumbers };
  }

  return { numberOfFigures, addNewFigure, reset };
});
