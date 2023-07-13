<script setup lang="ts">
import { ref } from 'vue';

const avatars = import.meta.glob('@/assets/avatars/*.png');
const selectedAvatar = ref<string | null>(null);
const emit = defineEmits(["select-avatar"]);

interface Avatar {
  name: string;
}

function selectAvatar(avatar: string) {
  selectedAvatar.value = avatar;
  emit("select-avatar", avatar);
}

function getAvatarPath(avatar: Avatar) {
  return avatar.name.replace('/public', '');
}
</script>

<template>
  <div :class="$style.container">
    <div v-for="avatar in avatars" :class="{ [$style.avatar]: true, [$style.selected]: avatar.name === selectedAvatar }"
      @click="selectAvatar(avatar.name)">
      <img :src="getAvatarPath(avatar)" />
    </div>
  </div>
  <div class="d-flex justify-center mt-2" :class="$style.caption">↓ Scroll down to see more ↓</div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-height: 170px;
  overflow-y: auto;
}

.avatar {
  width: 80px;
  height: 80px;
  cursor: pointer;
  display: flex;
  overflow: hidden;
  background-color: #ccc;
  object-fit: cover;
  border-radius: 50%;
  padding: 4px;
  z-index: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 1;
}

.selected {
  background-color: #1a609d;
}

.caption {
  font-size: .8rem;
  opacity: .6;
}
</style>
