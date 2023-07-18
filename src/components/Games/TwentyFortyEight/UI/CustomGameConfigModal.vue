<script setup lang="ts">
import { computed, ref } from "vue";

import { IGameConfig } from "@/helpers/games/twentyFortyEight/gameConfig";
import {
  sizeOptions,
  startTilesOptions,
  fourSpawnChanceOptions,
  tileSizeOptions,
  tileGapOptions,
  tileRoundSizeOptions,
} from "@/helpers/games/twentyFortyEight/entities";

const props = defineProps<{
  showModal: boolean;
}>();
const emit = defineEmits(["close-dialog", "submit-dialog"]);

const gameConfiguration = ref<Partial<IGameConfig>>({
  fieldSize: 4,
  startTiles: 2,
  fourSpawnChance: 0.1,
  tileSize: 100,
  tileGap: 20,
  tileRoundSize: 5,
});

const previewWrapperStyles = computed(() => {
  const { tileSize, tileGap } = gameConfiguration.value;

  const size = tileSize! + tileGap! * 2;

  return {
    width: `${size}px`,
    height: `${size}px`,
    padding: `${tileGap}px`,
  };
});

const previewStyles = computed(() => {
  const { tileSize, tileRoundSize } = gameConfiguration.value;

  return {
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    "border-radius": `${tileRoundSize}px`,
  };
});

function closeDialog() {
  emit("close-dialog");
}

function submitDialog() {
  emit("submit-dialog", gameConfiguration.value);
}
</script>

<template>
  <v-dialog :model-value="props.showModal" width="800" :persistent="true">
    <v-card>
      <v-card-title class="text-h5"> Custom game configuration </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="gameConfiguration.fieldSize"
                :items="sizeOptions"
                density="comfortable"
                label="Field Size"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="gameConfiguration.startTiles"
                :items="startTilesOptions"
                density="comfortable"
                label="Number of tiles filled at start"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="gameConfiguration.fourSpawnChance"
                :items="fourSpawnChanceOptions"
                density="comfortable"
                label="Chance of spawning 4"
                item-title="label"
                item-value="value"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h4>Field view customization</h4>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="gameConfiguration.tileSize"
                :items="tileSizeOptions"
                label="Tile Size"
              ></v-select>
              <v-select
                v-model="gameConfiguration.tileGap"
                :items="tileGapOptions"
                label="Gap between tiles"
              ></v-select>
              <v-select
                v-model="gameConfiguration.tileRoundSize"
                :items="tileRoundSizeOptions"
                label="Tile rounded border radius"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <div :class="$style.previewWrapper" :style="previewWrapperStyles">
                <div :class="$style.preview" :style="previewStyles"></div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="amber-darken-2" variant="outlined" @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue-darken-4" variant="flat" @click="submitDialog"> Start </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" module>
.previewWrapper {
  background-color: #bbada0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview {
  background-color: #cdc1b4;
}
</style>
