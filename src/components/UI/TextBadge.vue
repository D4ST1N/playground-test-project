<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    darker?: boolean;
  }>(),
  {
    darker: false,
  },
);
</script>

<template>
  <div :class="{ [$style.badge]: true, [$style.darker]: props.darker }">
    <slot />
  </div>
</template>

<style lang="scss" module>
.badge {
  padding: 20px 32px;
  color: var(--main-secondary-color);
  background: linear-gradient(
    90deg,
    #0f0b0c00 0%,
    var(--main-darkest-color) 30%,
    var(--main-darkest-color) 70%,
    #0f0b0c00 100%
  );
}

.darker {
  background: linear-gradient(
    90deg,
    #0f0b0c68 0%,
    var(--main-darkest-color) 20%,
    var(--main-darkest-color) 80%,
    #0f0b0c68 100%
  );
}
</style>
