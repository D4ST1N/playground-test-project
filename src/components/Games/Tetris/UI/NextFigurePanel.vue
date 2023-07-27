<script setup lang="ts"></script>

<template>
  <div :class="$style.nextFigurePanel">
    <h2 :class="$style.title">Next</h2>
    <slot />
  </div>
</template>

<style lang="scss" module>
.nextFigurePanel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 140px;
  height: 90px;
}

.title {
  color: var(--main-primary-color);
}
</style>
