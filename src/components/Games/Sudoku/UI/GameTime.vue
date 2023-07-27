<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSudokuStore } from "@/store/games/sudoku";

const sudokuStore = useSudokuStore();
const { time } = storeToRefs(sudokuStore);
</script>

<template>
  <div :class="$style.timer">
    <v-icon icon="mdi-timer" :size="28" />
    {{ time }}
  </div>
</template>

<style lang="scss" module>
.timer {
  font-size: 36px;
  min-width: 120px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  gap: 8px;
}
</style>
