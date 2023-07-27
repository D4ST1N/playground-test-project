<script setup lang="ts">
import TitleDiamond from "./TitleDiamond.vue";

const props = withDefaults(
  defineProps<{
    showLines?: boolean;
  }>(),
  {
    showLines: true,
  },
);
</script>

<template>
  <h2 :class="$style.title">
    <div v-if="props.showLines" :class="$style.line"></div>
    <TitleDiamond />
    <slot />
    <TitleDiamond />
    <div v-if="props.showLines" :class="[$style.line, $style.reverse]"></div>
  </h2>
</template>

<style lang="scss" module>
.title {
  color: var(--main-primary-color);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 300;
  letter-spacing: 1px;
  width: 100%;
  justify-content: center;
}

.line {
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, #0f0b0c00 0%, var(--main-primary-color) 100%);
}

.reverse {
  rotate: 180deg;
}
</style>
