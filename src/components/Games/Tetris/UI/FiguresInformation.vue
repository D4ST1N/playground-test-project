<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTetrisStore } from "@/store/games/tetris";

const tetrisStore = useTetrisStore();
const { numberOfFigures } = storeToRefs(tetrisStore);
</script>

<template>
  <div :class="$style.figuresInformation">
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
  align-items: flex-start;
}

.figures {
  display: flex;
  align-items: center;
  gap: 12px;
}

.figure {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.figureCount {
  width: 40px;
}
</style>
