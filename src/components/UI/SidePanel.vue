<script lang="ts" setup>
import UserPanel from "@/components/User/UserPanel.vue";
</script>

<template>
  <div :class="$style.panel">
    <div :class="$style.user">
      <UserPanel />
    </div>
    <div :class="$style.panelContent">
      <slot name="panel"></slot>
    </div>
    <div :class="$style.navigation">
      <v-btn
        variant="text"
        prepend-icon="mdi-controller"
        to="/"
        :class="$style.games"
      >
        All Games
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" module>
.panel {
  grid-area: panel;
  border-right: 1px solid #d2b68152;
  padding: 16px;
  display: grid;
  grid-template-rows: 50px 1fr 30px;
  grid-template-columns: auto;
  grid-template-areas:
    "user"
    "panel"
    "navigation";
}

.user {
  grid-area: user;
}

.panelContent {
  grid-area: panel;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.navigation {
  grid-area: navigation;
}

.games {
  font-size: 20px;
}
</style>
