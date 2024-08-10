<template>
  <v-progress-circular
    v-if="!isLoaded"
    color="primary"
    indeterminate
  ></v-progress-circular>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { applyActionCode } from 'firebase/auth';
import { useFirebaseAuth } from "vuefire";

const props = defineProps<{
  actionCode: string
}>();

const emit = defineEmits<{
  (e: 'verified', msg: string): void
  (e: 'error', error: string): void
}>();

const isLoaded = ref(true);

onMounted(() => {
  verifyEmail();
});

const verifyEmail = () => {
  isLoaded.value = false;
  const auth = useFirebaseAuth();
  applyActionCode(auth, props.actionCode)
    .then(() => {
      emit('verified', 'Je e-mailadres is geverifieerd.');
    })
    .catch((error) => {
      emit('error', `Error bij e-mailverificatie: ${error.message}`);
    })
    .finally(() => {
      isLoaded.value = true;
    });
};
</script>
