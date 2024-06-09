<script setup lang="ts">
import { ref } from "vue";
import { defaultGameConfigurations } from "@/helpers/games/minesweeper/entities";
import {
  DefaultFieldSize,
  CustomFieldSize,
  GameFieldOptions,
} from "@/helpers/games/minesweeper/types";
import { useMinesweeperStore } from "@/store/games/minesweeper";
import SelectCustomSizeModal from "@/components/Games/Minesweeper/UI/SelectCustomSizeModal.vue";
import StyledTitle from "@/components/UI/StyledTitle.vue";

const props = defineProps({
  disabled: Boolean,
});
const minesweeperStore = useMinesweeperStore();
const isModalOpen = ref<boolean>(false);

function showModal() {
  isModalOpen.value = true;
}

function handleClose() {
  isModalOpen.value = false;
}

function handleSubmit(customGameOptions: GameFieldOptions) {
  handleClose();
  minesweeperStore.startNewGame(customGameOptions, CustomFieldSize.Custom);
}

function startGameWithDefaultConfiguration(size: DefaultFieldSize) {
  minesweeperStore.startNewGame(defaultGameConfigurations[size], size);
}
</script>

<template>
  <div :class="$style.buttons">
    <StyledTitle> Choose game field size </StyledTitle>
    <v-btn
      :disabled="props.disabled"
      variant="outlined"
      @click="() => startGameWithDefaultConfiguration(DefaultFieldSize.Small)"
    >
      <template v-slot:prepend>
        <v-icon size="x-small">mdi-fire</v-icon>
      </template>
      Small
    </v-btn>
    <v-btn
      :disabled="props.disabled"
      variant="outlined"
      @click="() => startGameWithDefaultConfiguration(DefaultFieldSize.Medium)"
    >
      <template v-slot:prepend>
        <v-icon size="medium">mdi-fire</v-icon>
      </template>
      Medium
    </v-btn>
    <v-btn
      :disabled="props.disabled"
      variant="outlined"
      @click="() => startGameWithDefaultConfiguration(DefaultFieldSize.Expert)"
    >
      <template v-slot:prepend>
        <v-icon size="x-large">mdi-fire</v-icon>
      </template>
      Expert
    </v-btn>
    <v-btn
      :disabled="props.disabled"
      variant="outlined"
      @click="showModal"
    >
      <template v-slot:prepend>
        <v-icon size="medium">mdi-help</v-icon>
      </template>
      Custom
    </v-btn>
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
