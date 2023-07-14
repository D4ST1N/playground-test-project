<template>
  <div :class="$style.wrapper">
    <img src="/src/assets/img/404.png" alt="404" :class="$style.background" />
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.background {
  max-height: calc(100vh - 60px);
}
</style>
