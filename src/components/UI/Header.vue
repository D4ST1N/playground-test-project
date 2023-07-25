<template>
  <div class="elevation-6" :class="$style.header">
    <div>
      <v-btn variant="text" prepend-icon="mdi-controller" to="/" :class="$style.logo">
        Games list
      </v-btn>
    </div>
    <div>
      <slot name="title"></slot>
    </div>
    <div :class="$style.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
.header {
  width: 100%;
  height: 74px;
  padding: 12px 16px;
  background-color: rgba(38, 50, 56, 0.8);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  letter-spacing: normal;
}

.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
