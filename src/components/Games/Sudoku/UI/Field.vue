<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useSudokuStore } from "@/store/games/sudoku";
import Cell from "@/components/Games/Sudoku/UI/Cell.vue";
import { config } from "@/helpers/games/sudoku/gameConfig";
import { computed, ref } from "vue";
import { indexToRowAndColumn } from "@/helpers/games/sudoku/helpers";

const sudokuStore = useSudokuStore();
const { gameField, initialGameField, solvedGameField } = storeToRefs(sudokuStore);

const focusedCellIndex = ref<number | null>(null);

const highlightedNumber = computed(() => {
  if (focusedCellIndex.value === null) return null;

  return gameField.value[focusedCellIndex.value];
});

const fieldStyles = {
  width: `${config.cellSize * 9}px`,
  height: `${config.cellSize * 9}px`,
};

function isCurrent(cellIndex: number) {
  return focusedCellIndex.value === cellIndex;
}

function isHighlighted(cellIndex: number) {
  if (focusedCellIndex.value === null) return false;

  const { row: focusedRow, col: focusedColumn } = indexToRowAndColumn(focusedCellIndex.value);
  const { row: cellRow, col: cellColumn } = indexToRowAndColumn(cellIndex);
  return focusedRow === cellRow || focusedColumn === cellColumn;
}

function isIncorrect(cellIndex: number) {
  return (
    gameField.value[cellIndex] !== 0 &&
    gameField.value[cellIndex] !== solvedGameField.value[cellIndex]
  );
}

function isInitial(cellIndex: number) {
  return (
    initialGameField.value[cellIndex] === gameField.value[cellIndex] &&
    initialGameField.value[cellIndex] !== 0
  );
}

function onCellFocus(cellIndex: number) {
  focusedCellIndex.value = cellIndex;
}
</script>

<template>
  <div :class="$style.field" :style="fieldStyles">
    <Cell
      v-for="(cell, index) in gameField"
      :key="index"
      :value="cell"
      :cellIndex="index"
      :isInitial="isInitial(index)"
      :isCurrent="isCurrent(index)"
      :highlighted="isHighlighted(index)"
      :highlightedNumber="highlightedNumber"
      :withError="isIncorrect(index)"
      @focus="onCellFocus"
    />
  </div>
</template>

<style lang="scss" module>
.field {
  display: grid;
  grid-template-columns: repeat(9, auto);
  grid-gap: 0;
}
</style>
