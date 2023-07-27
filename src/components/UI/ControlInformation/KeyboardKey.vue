<script setup lang="ts">
const props = defineProps<{
  keyboardKey: string;
}>();
</script>

<template>
  <div :class="$style.wrapper">
    <kbd :class="$style.key">{{ props.keyboardKey }}</kbd>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
}

.key {
  border: 2px solid var(--main-primary-color);
  box-shadow: 2px 2px var(--main-secondary-color);
  font-size: 1.25rem;
  line-height: 0.85em;
  display: inline-block;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 3px 5px;
  white-space: nowrap;
  margin-right: 6px;
  color: var(--main-secondary-color);
}
</style>
