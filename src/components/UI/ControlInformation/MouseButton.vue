<script setup lang="ts">
import { MouseButtonType } from "@/helpers/generalTypes";

const props = defineProps<{
  button: MouseButtonType;
}>();
</script>

<template>
  <div :class="$style.button">
    <img :src="`/src/assets/img/mouse/${props.button}.png`" :alt="props.button" />
  </div>
</template>

<style lang="scss" module>
.button {
  height: 32px;
}
</style>
