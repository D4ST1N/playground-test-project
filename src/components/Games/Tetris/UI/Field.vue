<script setup lang="ts"></script>

<template>
  <div :class="$style.field">
    <slot />
  </div>
</template>

<style lang="scss" module>
.field {
  display: flex;
  justify-content: center;
  width: 420px;
  margin-left: 160px;
}
</style>
