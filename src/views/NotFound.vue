<template>
  <div :class="$style.wrapper">
    <v-btn
      variant="text"
      color="var(--main-primary-color)"
      prepend-icon="mdi-controller"
      to="/"
      :class="$style.games"
    >
      All Games
    </v-btn>
    <img src="/src/assets/img/404.png" alt="404" :class="$style.background" />
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--main-darkest-color);
}
.background {
  max-height: calc(100vh - 60px);
}

.games {
  font-size: 20px;
}
</style>
