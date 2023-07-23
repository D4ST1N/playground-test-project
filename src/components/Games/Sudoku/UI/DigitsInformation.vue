<script setup lang="ts">
import { useSudokuStore } from "@/store/games/sudoku";

const gameStore = useSudokuStore();
</script>

<template>
  <div :class="$style.digitsInformation">
    <h2 class="mb-2">Digits left:</h2>
    <div
      v-for="(count, digit) in gameStore.digitsUsed"
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  gap: 5px;
}

.digitWrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease-in-out;
}

.filled {
  opacity: 0;
}

.digit {
  width: 60px;
  height: 60px;
  border: 1px solid #eeec;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 40px;
}

.count {
  font-size: 30px;
  position: relative;
  margin-left: 20px;

  &::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 2px;
    background-color: #fff;
    opacity: 1;
    top: calc(50% - 1px);
    left: -24px;
  }
}
</style>
