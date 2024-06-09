<script setup lang="ts">
import { ref } from "vue";
import StyledTitle from "@/components/UI/StyledTitle.vue";

const dialogVisible = ref<boolean>(false);

function openDialog() {
  dialogVisible.value = true;
}

function closeDialog() {
  dialogVisible.value = false;
}
</script>

<template>
  <v-btn v-if="$slots.content" size="x-large" rounded @click="openDialog" :class="$style.button">
    <v-icon size="x-large">mdi-progress-question</v-icon>
    <v-tooltip activator="parent" location="left" theme="dark">
      Show information about the game
    </v-tooltip>
  </v-btn>
  <v-dialog v-model="dialogVisible" scrollable width="800">
    <v-card color="var(--main-darker-color)" style="max-height: 800px">
      <v-card-title class="pa-6">
        <StyledTitle>Rules</StyledTitle>
      </v-card-title>
      <slot name="content" />
      <v-card-actions class="d-flex justify-center">
        <v-btn variant="outlined" @click="closeDialog">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" module>
.button {
  padding: 0;
  color: var(--main-primary-color);
  min-width: 52px;
}
</style>
