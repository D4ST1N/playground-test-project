<script setup lang="ts">
import GameInformation from "@/components/UI/GameInformation/GameInformation.vue";
import SidePanel from "@/components/UI/SidePanel.vue";

const props = withDefaults(
  defineProps<{
    header?: boolean;
  }>(),
  {
    header: true,
  },
);
</script>

<template>
  <div :class="{ [$style.layout]: true, [$style.fullHeight]: !props.header }">
    <SidePanel>
      <template v-if="$slots.panel" #panel>
        <slot name="panel"></slot>
      </template>
    </SidePanel>
    <div v-if="props.header" :class="$style.header">
      <slot name="header"></slot>
    </div>
    <div :class="$style.content">
      <div v-if="$slots.top" :class="$style.topContent">
        <slot name="top"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
  <div :class="$style.actions">
    <slot name="actions"></slot>
    <GameInformation>
      <template v-if="$slots.information" #content>
        <slot name="information"></slot>
      </template>
    </GameInformation>
  </div>
</template>

<style lang="scss" module>
.layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: -moz-linear-gradient(
    90deg,
    rgb(15, 11, 12) 0%,
    rgb(30, 22, 22) 47%,
    rgb(44, 32, 32) 100%
  );
  background-image: -webkit-linear-gradient(
    90deg,
    rgb(15, 11, 12) 0%,
    rgb(30, 22, 22) 47%,
    rgb(44, 32, 32) 100%
  );
  background-image: -ms-linear-gradient(
    90deg,
    rgb(15, 11, 12) 0%,
    rgb(30, 22, 22) 47%,
    rgb(44, 32, 32) 100%
  );
  z-index: 1;
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas:
    "panel header"
    "panel content";
}

.fullHeight {
  grid-template-areas:
    "panel content"
    "panel content";
}

.content {
  grid-area: content;
  padding: 16px;
}

.topContent {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  margin-bottom: 16px;
  gap: 24px;
}

.header {
  grid-area: header;
  border-bottom: 1px solid #d2b68152;
  display: flex;
  justify-content: space-between;
  padding: 16px;
}

.actions {
  position: absolute;
  right: 24px;
  bottom: 24px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
</style>
