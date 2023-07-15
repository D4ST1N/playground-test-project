<template>
  <div :class="$style.layout">
    <slot name="header"></slot>
    <div :class="$style.content">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<style lang="scss" module>
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  height: 100vh;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(30, 136, 229, 1) 0%,
    rgba(100, 181, 246, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
}

.content {
  flex-grow: 1;
  width: 100%;
}
</style>
