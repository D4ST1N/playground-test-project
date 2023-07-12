<script setup lang="ts">

</script>

<template>
  <div :class="$style.nextFigurePanel">
    <h2>Next figure</h2>
    <slot />
  </div>
</template>

<style lang="scss" module>
.nextFigurePanel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 200px;
}
</style>
