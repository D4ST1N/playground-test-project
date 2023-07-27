<script setup lang="ts">
import StyledTitle from "@/components/UI/StyledTitle.vue";
import TitleDiamond from "../TitleDiamond.vue";

const props = defineProps<{
  title?: string;
  items: string[];
}>();
</script>

<template>
  <div :class="$style.section">
    <div v-if="title" :class="$style.sectionHeader">
      <StyledTitle>{{ props.title }}</StyledTitle>
    </div>
    <slot name="before" />
    <div :class="$style.sectionItems">
      <div v-for="(item, index) in props.items" :key="index" :class="$style.item">
        <TitleDiamond />
        <span v-html="item"></span>
      </div>
    </div>
    <slot name="after" />
  </div>
</template>

<style lang="scss" module>
.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sectionHeader {
  font-size: 1rem;
}

.sectionItems {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item {
  display: flex;
  color: var(--main-secondary-color);
  align-items: center;
  gap: 12px;
}

.item span {
  max-width: calc(100% - 28px);
}
</style>
