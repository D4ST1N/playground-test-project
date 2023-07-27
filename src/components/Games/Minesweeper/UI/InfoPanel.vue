<script setup lang="ts">
import { storeToRefs } from "pinia";
import TitleDiamond from "@/components/UI/TitleDiamond.vue";
import { useMinesweeperStore } from "@/store/games/minesweeper";

const minesweeperStore = useMinesweeperStore();
const { time } = storeToRefs(minesweeperStore);
</script>

<template>
  <div :class="$style.panelWrapper">
    <div :class="$style.timer">
      {{ time }}
      <v-icon icon="mdi-timer" :size="28" />
    </div>
    <TitleDiamond />
    <div :class="$style.bombsCount">
      <v-icon icon="mdi-mine" :size="28" />
      {{ minesweeperStore.bombsCount }}
    </div>
  </div>
</template>

<style lang="scss" module>
.panelWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--main-primary-color);
  gap: 32px;
}

.bombsCount {
  font-size: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}

.timer {
  font-size: 24px;
  min-width: 90px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
