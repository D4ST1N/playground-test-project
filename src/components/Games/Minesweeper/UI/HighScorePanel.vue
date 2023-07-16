<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMinesweeperStore } from "@/store/games/minesweeper";
import { computed } from "vue";
import { formatTime } from "@/helpers/generalHelpers";
import { DefaultFieldSize } from "@/helpers/games/minesweeper/types";

const store = useMinesweeperStore();
const { scores, sizeSelected } = storeToRefs(store);
const highScores = computed(() => scores.value[sizeSelected.value as DefaultFieldSize]);
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
  align-items: flex-start;
  gap: 10px;
  width: 180px;
}
</style>
