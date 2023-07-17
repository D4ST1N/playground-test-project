<script setup lang="ts">
import { ref } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
</script>

<template>
  <div :class="$style.gameWrapper">
    <canvas ref="canvasRef" width="500" height="500" />
  </div>
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
</style>
