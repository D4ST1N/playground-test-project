<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTwentyFortyEightStore } from "@/store/games/twentyFortyEight";

const tfeStore = useTwentyFortyEightStore();
const { scores, current } = storeToRefs(tfeStore);
</script>

<template>
  <div :class="$style.highScore">
    <h2 :class="$style.title">High Scores</h2>
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
  color: var(--main-secondary-color);
}

.title {
  color: var(--main-primary-color);
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
