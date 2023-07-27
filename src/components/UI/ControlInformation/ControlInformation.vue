<script setup lang="ts">
import { ControlInformation, ControlType } from "@/helpers/generalTypes";
import KeyboardKey from "@/components/UI/ControlInformation/KeyboardKey.vue";
import MouseButton from "@/components/UI/ControlInformation/MouseButton.vue";

const props = defineProps<{
  controls: ControlInformation[];
}>();
</script>

<template>
  <div :class="$style.controlInformation">
    <h2 :class="$style.title">Controls</h2>
    <div v-for="control in props.controls" :class="$style.controlWrapper">
      <div v-if="control.type === ControlType.Keyboard" :class="$style.control">
        <KeyboardKey
          v-for="keyboardKey in control.control"
          :key="keyboardKey.key"
          :keyboardKey="keyboardKey.key"
        />
      </div>
      <div v-if="control.type === ControlType.Mouse" :class="$style.control">
        <MouseButton
          v-for="mouseButton in control.control"
          :key="mouseButton.button"
          :button="mouseButton.button"
        />
      </div>
      <div :class="$style.dash"></div>
      <div :class="$style.description">
        {{ control.description }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.controlInformation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
}

.title {
  color: var(--main-primary-color);
}

.controlWrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
}

.control {
  display: flex;
  gap: 4px;
}

.dash {
  width: 10px;
  height: 2px;
  background-color: var(--main-secondary-color);
}

.description {
  color: var(--main-secondary-color);
}
</style>
