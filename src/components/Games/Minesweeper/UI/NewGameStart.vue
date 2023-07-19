<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { defaultGameConfigurations } from "@/helpers/games/minesweeper/entities";
import {
  DefaultFieldSize,
  CustomFieldSize,
  GameFieldOptions,
} from "@/helpers/games/minesweeper/types";
import { useMinesweeperStore } from "@/store/games/minesweeper";
import { useUserStore } from "@/store/user";
import SelectCustomSizeModal from "@/components/Games/Minesweeper/UI/SelectCustomSizeModal.vue";

const userStore = useUserStore();
const store = useMinesweeperStore();
const isModalOpen = ref(false);
const { user } = storeToRefs(userStore);

function showModal() {
  isModalOpen.value = true;
}

function handleClose() {
  isModalOpen.value = false;
}

function handleSubmit(customGameOptions: GameFieldOptions) {
  handleClose();
  store.startNewGame(customGameOptions, CustomFieldSize.Custom);
}

function startGameWithDefaultConfiguration(size: DefaultFieldSize) {
  store.startNewGame(defaultGameConfigurations[size], size);
}
</script>

<template>
  <div :class="$style.buttons">
    <v-alert
      v-if="!user"
      type="info"
      title="You need to be authorized to play games"
      class="elevation-4 mt-4"
    ></v-alert>
    <h2>Choose game field size:</h2>
    <v-btn
      :disabled="!user"
      color="success"
      @click="() => startGameWithDefaultConfiguration(DefaultFieldSize.Small)"
    >
      Small
    </v-btn>
    <v-btn
      :disabled="!user"
      color="warning"
      @click="() => startGameWithDefaultConfiguration(DefaultFieldSize.Medium)"
    >
      Medium
    </v-btn>
    <v-btn
      :disabled="!user"
      color="error"
      @click="() => startGameWithDefaultConfiguration(DefaultFieldSize.Expert)"
    >
      Expert
    </v-btn>
    <v-btn color="info" @click="showModal"> Custom </v-btn>
    <SelectCustomSizeModal
      :showModal="isModalOpen"
      @close-dialog="handleClose"
      @submit-dialog="handleSubmit"
    />
  </div>
</template>

<style lang="scss" module>
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
