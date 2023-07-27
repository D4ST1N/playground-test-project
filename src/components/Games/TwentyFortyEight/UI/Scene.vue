<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTwentyFortyEightStore } from "@/store/games/twentyFortyEight";
import { GameStatus } from "@/helpers/generalTypes";
import Confetti from "@/components/UI/Confetti.vue";

const tfeStore = useTwentyFortyEightStore();
const { status } = storeToRefs(tfeStore);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const gameStarted = computed(() => status.value !== GameStatus.NotStarted);

onMounted(() => {
  tfeStore.init(canvasRef.value!);
});
</script>

<template>
  <div :class="$style.gameWrapper">
    <div v-show="gameStarted" :class="$style.fieldWrapper">
      <canvas ref="canvasRef" width="500" height="500" />
    </div>
  </div>
  <Confetti v-if="tfeStore.status === GameStatus.Victory" />
</template>

<style lang="scss" module>
.gameWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
}

.fieldWrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
}
</style>
