<script setup lang="ts">
import { getAssetUrl } from "@/helpers/generalHelpers";
import { MouseButtonType } from "@/helpers/generalTypes";

const props = defineProps<{
  button: MouseButtonType;
}>();
const mouseButtonIcon = getAssetUrl(`/assets/img/mouse/${props.button.toLocaleLowerCase()}.png`);
</script>

<template>
  <div :class="$style.button">
    <img :src="mouseButtonIcon" :alt="props.button" />
  </div>
</template>

<style lang="scss" module>
.button {
  height: 32px;
}
</style>
