<script setup lang="ts">
import { computed, ref } from "vue";
import StyledTitle from "@/components/UI/StyledTitle.vue";
import { GameFieldOptions } from "@/helpers/games/minesweeper/types";

const props = defineProps<{
  showModal: boolean;
}>();
const emit = defineEmits(["close-dialog", "submit-dialog"]);

const gameConfiguration = ref<GameFieldOptions>({
  width: 9,
  height: 9,
  numberOfMines: 10,
});

const maxNumberOfMines = computed(() => {
  const { width, height } = gameConfiguration.value;
  return Math.round((width * height) / 4);
});

const validConfiguration = computed(() => {
  const { width, height, numberOfMines } = gameConfiguration.value;
  return (
    width >= 9 &&
    width <= 30 &&
    height >= 9 &&
    height <= 20 &&
    numberOfMines >= 10 &&
    numberOfMines <= maxNumberOfMines.value
  );
});

function closeDialog() {
  emit("close-dialog");
}

function submitDialog() {
  if (validConfiguration.value) {
    emit("submit-dialog", gameConfiguration.value);
  }
}

function validateWidth(value: number) {
  if (value < 9) return "Width must be greater than 9";
  if (value > 30) return "Width must be less or equal 30";

  return true;
}

function validateHeight(value: number) {
  if (value < 9) return "Height must be greater than 9";
  if (value > 20) return "Height must be less or equal 30";

  return true;
}

function validateNumberOfMines(value: number) {
  if (value < 10) return "Number of mines must be greater than 10";
  if (value > maxNumberOfMines.value)
    return `Number of mines must be less or equal ${maxNumberOfMines.value}`;

  return true;
}
</script>

<template>
  <v-dialog :model-value="props.showModal" width="600" :persistent="true">
    <v-card color="var(--main-darkest-color)">
      <v-card-title class="pt-4">
        <StyledTitle>Custom game configuration</StyledTitle>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.number="gameConfiguration.width"
                label="Width"
                type="number"
                hint="Range: 9 - 30"
                persistent-hint
                required
                :rules="[validateWidth]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.number="gameConfiguration.height"
                label="Height"
                type="number"
                hint="Range: 9 - 20"
                persistent-hint
                required
                :rules="[validateHeight]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.number="gameConfiguration.numberOfMines"
                label="Number of mines"
                type="number"
                :hint="`Range: 10 - ${maxNumberOfMines}`"
                persistent-hint
                required
                :rules="[validateNumberOfMines]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions :class="$style.buttons">
        <v-btn color="primary" variant="outlined" @click="closeDialog">
          Close
        </v-btn>
        <v-btn
          :disabled="!validConfiguration"
          color="primary"
          variant="elevated"
          :class="$style.button"
          @click="submitDialog"
        >
          Start
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" module>
.buttons {
  display: flex;
  justify-content: center;
  gap: 24px;
}
.button {
  color: var(--main-darker-color);
}
</style>
