<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useMinesweeperStore } from "@/store/games/minesweeper";

const store = useMinesweeperStore();
const { time } = storeToRefs(store);
</script>

<template>
  <div :class="$style.panelWrapper">
    <div :class="$style.bombsCount">
      <v-icon icon="mdi-mine" :size="28" />
      {{ store.bombsCount }}
    </div>
    <div :class="$style.separator">|</div>
    <div :class="$style.timer">
      {{ time }}
      <v-icon icon="mdi-timer" :size="28" />
    </div>
  </div>
</template>

<style lang="scss" module>
.panelWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #efefef;
  gap: 12px;
}

.bombsCount {
  font-size: 36px;
  min-width: 120px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}

.separator {
  font-size: 40px;
  font-weight: bold;
}

.timer {
  font-size: 36px;
  min-width: 120px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
