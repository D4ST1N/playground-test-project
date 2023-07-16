<script setup lang="ts">
import { useMinesweeperStore } from "@/store/games/minesweeper";
import Field from "@/components/Games/Minesweeper/Game/Field.vue";
import InfoPanel from "@/components/Games/Minesweeper/UI/InfoPanel.vue";
import NewGameStart from "./NewGameStart.vue";
import Notifications from "./Notifications.vue";
import HighScorePanel from "./HighScorePanel.vue";
import { DefaultFieldSize } from "@/helpers/games/minesweeper/types";
import { computed } from "vue";

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
</style>
