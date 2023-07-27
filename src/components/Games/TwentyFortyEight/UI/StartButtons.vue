<script setup lang="ts">
import { ref } from "vue";
import CustomGameConfigModal from "@/components/Games/TwentyFortyEight/UI/CustomGameConfigModal.vue";
import { IGameConfig } from "@/helpers/games/twentyFortyEight/gameConfig";
import { useTwentyFortyEightStore } from "@/store/games/twentyFortyEight";
import StyledTitle from "@/components/UI/StyledTitle.vue";

const props = defineProps({
  disabled: Boolean,
});
const showModal = ref<boolean>(false);
const tfeStore = useTwentyFortyEightStore();

function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function startGame() {
  tfeStore.start();
}

function startCustomGame(config: Partial<IGameConfig>) {
  closeModal();
  tfeStore.start(config);
}
</script>

<template>
  <div :class="$style.buttons">
    <StyledTitle> Choose game field size </StyledTitle>
    <v-btn
      :disabled="props.disabled"
      variant="outlined"
      color="var(--main-primary-color)"
      @click="startGame"
    >
      <template v-slot:prepend>
        <v-icon size="medium">mdi-fire</v-icon>
      </template>
      Standard
    </v-btn>
    <v-btn
      :disabled="props.disabled"
      variant="outlined"
      color="var(--main-primary-color)"
      @click="openModal"
    >
      <template v-slot:prepend>
        <v-icon size="medium">mdi-help</v-icon>
      </template>
      Custom settings
    </v-btn>
  </div>
  <CustomGameConfigModal
    :show-modal="showModal"
    @close-dialog="closeModal"
    @submit-dialog="startCustomGame"
  />
</template>

<style lang="scss" module>
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
