<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { useUserStore } from "@/store/user";
import CustomGameConfigModal from "@/components/Games/TwentyFortyEight/UI/CustomGameConfigModal.vue";
import { IGameConfig } from "@/helpers/games/twentyFortyEight/gameConfig";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const emit = defineEmits(["start-game", "start-custom-game"]);
const showModal = ref<boolean>(false);

function startGame() {
  emit("start-game");
}

function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function startCustomGame(config: Partial<IGameConfig>) {
  emit("start-custom-game", config);
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
    <v-btn :disabled="!user" color="success" @click="startGame"> Standard </v-btn>
    <v-btn :disabled="!user" color="info" @click="openModal"> Custom settings </v-btn>
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
