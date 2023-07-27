<script setup lang="ts">
import { computed } from "vue";
import { useMinesweeperStore } from "@/store/games/minesweeper";
import Field from "@/components/Games/Minesweeper/Game/Field.vue";
import { DefaultFieldSize } from "@/helpers/games/minesweeper/types";
import { GameStatus } from "@/helpers/generalTypes";
import Confetti from "@/components/UI/Confetti.vue";

const minesweeperStore = useMinesweeperStore();

const isDefaultFieldSize = computed(() => minesweeperStore.sizeSelected in DefaultFieldSize);
</script>

<template>
  <div class="pa-3">
    <div v-if="minesweeperStore.field" :class="$style.gameWrapper">
      <div :class="{ [$style.fieldWrapper]: isDefaultFieldSize }">
        <Field />
      </div>
    </div>
  </div>
  <Confetti v-if="minesweeperStore.status === GameStatus.Victory" />
</template>

<style lang="scss" module>
.gameWrapper {
  display: flex;
  align-self: flex-start;
  justify-content: center;
  gap: 30px;
}

.highScoreWrapper {
  margin-top: 53px;
}

.confettiContainer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding-top: 200px;
}
</style>
