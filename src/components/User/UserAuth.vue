<script setup lang="ts">
import { computed, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { User, useUserStore } from "@/store/user";
import UserAvatarSelect from "@/components/User/UserAvatarSelect.vue";

const props = defineProps<{
  showModal: boolean;
}>();
const emit = defineEmits(["close-dialog", "submit-dialog"]);
const userStore = useUserStore();

let initialUser = {
  name: "",
  avatar: "",
  id: uuidv4(),
};

if (userStore.user) {
  initialUser = {
    ...userStore.user,
    id: initialUser.id,
  };
}

const user = ref<User>(initialUser);

const validAuth = computed(() => {
  return user.value.name.length > 0 && user.value.avatar !== "";
});

function closeDialog() {
  emit("close-dialog", false);
}

function submitDialog() {
  emit("submit-dialog", user.value);
}

function changeUserAvatar(avatar: string) {
  user.value.avatar = avatar;
}
</script>

<template>
  <v-dialog :model-value="props.showModal" width="600" :persistent="true">
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h2 class="d-flex justify-center mb-2">Select avatar</h2>
              <UserAvatarSelect :avatar="user.avatar" @select-avatar="changeUserAvatar" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="user.name" label="Name" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <div class="d-flex justify-center">
          <a :class="$style.credit" href="http://www.freepik.com">
            Avatars designed by Kubanek / Freepik
          </a>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="amber-darken-2" variant="outlined" @click="closeDialog">Cancel</v-btn>
        <v-btn :disabled="!validAuth" color="blue-darken-4" variant="flat" @click="submitDialog">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" module>
.credit {
  font-size: 0.8rem;
  color: #888;
}
</style>
