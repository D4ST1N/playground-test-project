<script setup lang="ts">
import Field from "@/components/Games/Sudoku/UI/Field.vue";
import { GameStatus } from "@/helpers/generalTypes";
import { useSudokuStore } from "@/store/games/sudoku";
import Confetti from "@/components/UI/Confetti.vue";

const sudokuStore = useSudokuStore();
</script>

<template>
  <div :class="$style.scene">
    <div v-if="sudokuStore.status !== GameStatus.NotStarted" :class="$style.fieldWrapper">
      <Field />
    </div>
  </div>
  <Confetti v-if="sudokuStore.status === GameStatus.Victory" />
</template>

<style lang="scss" module>
.scene {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}

.fieldWrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
}
</style>
