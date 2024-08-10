<template>
  <v-form @submit.prevent="login">
    <v-text-field
      v-model="username"
      label="E-mailadres"
      outlined
      dense
    >
    </v-text-field>
    <v-text-field
      v-model="password"
      label="Wachtwoord"
      outlined
      dense
      type="password"
    />
    <v-btn type="submit" color="primary" :loading="isLoading" block class="mt-4">
      Inloggen
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';

const auth = useFirebaseAuth();

const username = ref('');
const password = ref('');
const isLoading = ref(false);

const emit = defineEmits(['login-success']);

const login = () => {
  isLoading.value = true;
  signInWithEmailAndPassword(auth, username.value, password.value)
    .then((userCredential) => {
      console.log('User logged-in as: ' + userCredential.user.email);
      emit('login-success');
    })
    .catch((error) => {
      const code = error.code;
      const message = error.message;

      switch (code) {
        case 'auth/network-request-failed':
          window.alert('Could not connect to the authentication server. Is your internet down?');
          break;
        case 'auth/invalid-email':
          window.alert('Invalid email format.');
          break;
        case 'auth/missing-password':
          window.alert('Please input a password.');
          break;
        case 'auth/user-not-found':
          window.alert('User does not exist, please register.');
          break;
        case 'auth/user-disabled':
          window.alert('User has been disabled, contact bestuur@indicium.hu');
          break;
        default:
          console.error(`User login failed: ${code} - ${message}`);
          break;
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
