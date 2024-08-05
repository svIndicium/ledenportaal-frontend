<template>
  <v-form @submit.prevent="register">
    <v-text-field
      v-model="username"
      label="E-mailadres"
      outlined
      dense
    >
      <template #details>
        <v-bottom-sheet inset>
          <template v-slot:activator="{ props }">
            <span v-bind="props" class="cursor-pointer">
              Zie <span class="text-decoration-underline"> informatie  </span> &blacktriangledown;
            </span>
          </template>
          <RegisterInfoCard/>
        </v-bottom-sheet>

      </template>
    </v-text-field>
    <v-text-field
      v-model="password"
      label="Wachtwoord"
      outlined
      dense
      type="password"
    />
    <v-btn type="submit" color="secondary" block class="mt-4">
      Registreren
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth();
const username = ref('');
const password = ref('');

const emit = defineEmits(['register-success']);

const register = () => {
  createUserWithEmailAndPassword(auth, username.value, password.value)
    .then((userCredential) => {
      sendEmailVerification(userCredential.user).then(() => {});
      emit('register-success');
    })
    .catch((error) => {
      const code = error.code;
      const message = error.message;

      switch (code) {
        case 'auth/email-already-exists':
          window.alert('Dit e-mailadres is reeds in gebruik. Als je denkt dat dit niet klopt, contacteer bestuur@indicium.hu');
          break;
        case 'auth/weak-password':
          window.alert('Ongeldig of onveilig wachtwoord. Wachtwoord moet uit minstens 6 tekens bestaan.');
          break;
        default:
          console.error(`User creation failed: ${code} - ${message}`);
          break;
      }
    });
};
</script>
