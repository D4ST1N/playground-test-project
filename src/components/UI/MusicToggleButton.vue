<script setup lang="ts">
const props = defineProps<{
  musicIsOn: boolean;
}>();
const emit = defineEmits(["toggle-music"]);

function toggleMusic() {
  emit("toggle-music");
}
</script>

<template>
  <v-btn
    :icon="props.musicIsOn ? 'mdi-music-off' : 'mdi-music'"
    size="large"
    :class="$style.button"
    @click="toggleMusic"
  ></v-btn>
</template>

<style lang="scss" module>
.button {
  color: var(--main-primary-color);
}
</style>
