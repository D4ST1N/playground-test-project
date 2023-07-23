<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { formatTime } from "@/helpers/generalHelpers";
import { useSudokuStore } from "@/store/games/sudoku";
import { GameDifficulty } from "@/helpers/games/sudoku/types";

const store = useSudokuStore();
const { scores, currentDifficulty } = storeToRefs(store);
const highScores = computed(() => scores.value[currentDifficulty.value as GameDifficulty]);
</script>

<template>
  <div :class="$style.highScore">
    <h2>High Score</h2>
    <div v-for="score in highScores">
      <b>{{ score.playerName }}:&nbsp;</b>
      <span>{{ formatTime(score.time) }}</span>
    </div>
    <div v-if="!highScores.length">No high scores yet</div>
  </div>
</template>

<style lang="scss" module>
.highScore {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  width: 180px;
}
</style>
