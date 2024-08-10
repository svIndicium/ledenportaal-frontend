<template>
  <v-form @submit.prevent="handleResetPassword">
    <v-text-field
      v-model="newPassword"
      label="Nieuw Wachtwoord"
      type="password"
      required
      :disabled="isError"
      :rules="[v => !!v || 'Wachtwoord is vereist.']"
    ></v-text-field>
    <v-text-field
      v-model="confirmPassword"
      label="Bevestig Wachtwoord"
      type="password"
      required
      :disabled="isError"
      :rules="[
        v => !!v || 'Voer wachtwoord twee keer in ter bevestiging.',
        v => v === newPassword || 'Wachtwoorden moeten overeenkomen.'
      ]"
    ></v-text-field>
    <v-btn type="submit" color="primary" :disabled="isError" :loading="loading">Reset Wachtwoord</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import {useFirebaseAuth} from "vuefire";

const props = defineProps<{
  actionCode: string
}>();

const emit = defineEmits<{
  (e: 'reset', msg: string): void
  (e: 'error', error: string): void
}>();

const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const isError = ref(false);

onMounted(() => {
  verifyCode();
});

const verifyCode = () => {
  const auth = useFirebaseAuth();
  verifyPasswordResetCode(auth, props.actionCode)
    .catch((error) => {
      isError.value = true;
      emit('error', `Ongeldige of verlopen link, of niet geauthenticeerd | ${error.message}`);
    });
};

const handleResetPassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    emit('error', 'De ingevoerde wachtwoorden komen niet overeen.');
    return;
  }

  loading.value = true;
  const auth = useFirebaseAuth();
  confirmPasswordReset(auth, props.actionCode, newPassword.value)
    .then(() => {
      emit('reset', 'Je wachtwoord is succesvol gereset.');
    })
    .catch((error) => {
      emit('error', `Error bij wachtwoord resetten: ${error.message}`);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
