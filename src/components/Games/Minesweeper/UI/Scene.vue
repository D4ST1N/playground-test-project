<script setup lang="ts">
import { computed } from "vue";

import { useMinesweeperStore } from "@/store/games/minesweeper";
import Field from "@/components/Games/Minesweeper/Game/Field.vue";
import InfoPanel from "@/components/Games/Minesweeper/UI/InfoPanel.vue";
import NewGameStart from "@/components/Games/Minesweeper/UI/NewGameStart.vue";
import Notifications from "@/components/Games/Minesweeper/UI/Notifications.vue";
import HighScorePanel from "@/components/Games/Minesweeper/UI/HighScorePanel.vue";
import { DefaultFieldSize } from "@/helpers/games/minesweeper/types";
import { GameStatus } from "@/helpers/generalTypes";
import Confetti from "@/components/UI/Confetti.vue";

const store = useMinesweeperStore();

const isDefaultFieldSize = computed(() => store.sizeSelected in DefaultFieldSize);
</script>

<template>
  <div class="pa-3">
    <div v-if="store.field" :class="$style.gameWrapper">
      <div :class="{ [$style.fieldWrapper]: isDefaultFieldSize }">
        <InfoPanel />
        <Field />
      </div>
      <div v-if="isDefaultFieldSize" :class="$style.highScoreWrapper">
        <HighScorePanel />
      </div>
    </div>
    <NewGameStart v-else />
  </div>
  <Notifications />
  <Confetti v-if="store.status === GameStatus.Victory" />
</template>

<style lang="scss" module>
.gameWrapper {
  display: flex;
  align-self: flex-start;
  justify-content: center;
  gap: 30px;
}

.fieldWrapper {
  margin-left: 180px;
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
