<script setup lang="ts">

</script>

<template>
  <div :class="$style.scorePanel">
    <h2>Score</h2>
    <slot />
  </div>
</template>

<style lang="scss" module>
.scorePanel {
  display: flex;
  width: 200px;
}
</style>
