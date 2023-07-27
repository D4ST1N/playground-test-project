<script setup lang="ts">
import { useSudokuStore } from "@/store/games/sudoku";

const sudokuStore = useSudokuStore();
</script>

<template>
  <div :class="$style.digitsInformation">
    <div
      v-for="(count, digit) in sudokuStore.digitsUsed"
      :key="digit"
      :class="{ [$style.digitWrapper]: true, [$style.filled]: count === 9 }"
    >
      <div :class="$style.digit">{{ digit }}</div>
      <div :class="$style.count">{{ 9 - count }}</div>
    </div>
  </div>
</template>

<style lang="scss" module>
.digitsInformation {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
}

.digitWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease-in-out;
}

.filled {
  opacity: 0;
}

.digit {
  width: 32px;
  height: 32px;
  border: 1px solid #eeec;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
}

.count {
  font-size: 16px;
  line-height: 1;
  font-weight: 200;
}
</style>
