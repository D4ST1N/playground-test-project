<template>
  <div class="elevation-6" :class="$style.header">
    <div :class="$style.logo"></div>
    <div :class="$style.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
.header {
  width: 100%;
  padding: 12px 16px;
  background-color: rgba(38, 50, 56, 0.8);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
