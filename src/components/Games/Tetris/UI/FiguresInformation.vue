<script setup lang="ts">
import { useTetrisStore } from "@/store/games/tetris";
import { storeToRefs } from "pinia";

const tetrisStore = useTetrisStore();
const { numberOfFigures } = storeToRefs(tetrisStore);
</script>

<template>
  <div class="mt-4" :class="$style.figuresInformation">
    <h2>Figures</h2>
    <div :class="$style.figures">
      <div v-for="(figureNumber, key) in numberOfFigures" :key="key" :class="$style.figure">
        <img :src="`/src/assets/img/tetris/figures/${key}.png`" :alt="key" />
        <div :class="$style.figureCount">- {{ figureNumber }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.figuresInformation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 140px;
}

.figures {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.figure {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
</style>
