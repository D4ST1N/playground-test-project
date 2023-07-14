<script setup lang="ts">
interface ControlInfo {
  name: string;
  keys: string[];
  description: string;
}
const controls: ControlInfo[] = [
  {
    name: "left",
    keys: ["A", "←"],
    description: "Move figure left",
  },
  {
    name: "right",
    keys: ["D", "→"],
    description: "Move figure right",
  },
  {
    name: "down",
    keys: ["S", "↓"],
    description: "Move figure down",
  },
  {
    name: "rotate",
    keys: ["W", "↑"],
    description: "Rotate figure",
  },
  {
    name: "toggle-pause",
    keys: ["Space"],
    description: "Pause/Resume game",
  },
];
</script>

<template>
  <div class="mt-3">
    <h2>Controls:</h2>
    <ul :class="$style.list">
      <li v-for="control in controls" :key="control.name" :class="$style.item">
        <kbd v-for="key in control.keys" :key="key" :class="$style.key">{{ key }}</kbd>
        <span :class="$style.description">{{ control.description }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" module>
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  margin-bottom: 10px;
}

.key {
  border: 2px solid black;
  box-shadow: 2px 2px black;
  font-size: 2rem;
  line-height: 0.85em;
  display: inline-block;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 3px 5px;
  white-space: nowrap;
  margin-right: 6px;
}

.description {
  margin-left: 10px;
}
</style>
