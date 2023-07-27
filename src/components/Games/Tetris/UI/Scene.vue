<script setup lang="ts">
import { onMounted, ref } from "vue";
import Field from "@/components/Games/Tetris/UI/Field.vue";
import NextFigurePanel from "@/components/Games/Tetris/UI/NextFigurePanel.vue";
import { useTetrisStore } from "@/store/games/tetris";

const tetrisStore = useTetrisStore();
const canvasRef = ref<HTMLCanvasElement | null>(null);
const nextFigureCanvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!canvasRef.value || !nextFigureCanvasRef.value) {
    return;
  }

  tetrisStore.init(canvasRef.value, nextFigureCanvasRef.value);
});
</script>

<template>
  <div :class="$style.scene">
    <Field>
      <canvas ref="canvasRef" width="420" height="840" />
    </Field>
    <div :class="$style.panel">
      <NextFigurePanel>
        <canvas ref="nextFigureCanvasRef" width="160" height="160" />
      </NextFigurePanel>
    </div>
  </div>
</template>

<style lang="scss" module>
.scene {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  gap: 20px;
}

.panel {
  display: flex;
  flex-direction: column;
}

.leftPanel {
  align-items: flex-end;
}
</style>
