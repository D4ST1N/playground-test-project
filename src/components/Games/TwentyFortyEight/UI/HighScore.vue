<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useTwentyFortyEightStore } from "@/store/games/twentyFortyEight";

const tetrisStore = useTwentyFortyEightStore();
const { scores, current } = storeToRefs(tetrisStore);
</script>

<template>
  <div :class="$style.highScore">
    <h2>High Scores</h2>
    <div v-for="score in scores" :class="{ [$style.currentHighScore]: score.id === current }">
      <b>{{ score.playerName }}:&nbsp;</b>
      <span>{{ score.score }}</span>
    </div>
  </div>
</template>

<style lang="scss" module>
.highScore {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 200px;
  min-height: 150px;
}

.currentHighScore {
  font-size: 1.5rem;
  color: #d3f7ff;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-left: 10px solid #d3f7ff;
  }
}
</style>
