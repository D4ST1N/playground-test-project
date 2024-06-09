<script setup lang="ts">
const props = defineProps<{
  showModal: boolean;
}>();
const emit = defineEmits(["close-dialog", "submit-dialog"]);

function closeDialog() {
  emit("close-dialog");
}

function submitDialog() {
  emit("submit-dialog");
}
</script>

<template>
  <v-dialog :model-value="props.showModal" width="600" :persistent="true">
    <v-card>
      <v-card-title class="text-h5"> Do you really want to logout? </v-card-title>
      <v-card-text>Logging out will lead to lose all current game progress</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="submitDialog"> Logout </v-btn>
        <v-btn variant="outlined" @click="closeDialog"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
