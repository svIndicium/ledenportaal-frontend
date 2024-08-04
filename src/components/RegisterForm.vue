<template>
  <v-form @submit.prevent="register">
    <v-text-field
      v-model="username"
      label="E-mailadres"
      outlined
      dense
    >

      <template #details>
        <span class="cursor-pointer" @mousedown="openPanel">
          Zie <span class="text-decoration-underline"> informatie </span>
        </span>
      </template>
    </v-text-field>
    <v-text-field
      v-model="password"
      label="Wachtwoord"
      outlined
      dense
      type="password"
    />

    <v-expansion-panels variant="accordion" :model-value="informationPanel">
      <v-expansion-panel
        title="Informatie"
      >
        <v-expansion-panel-text>
          <v-list>
            <v-list-item>
              <v-list-item-title>E-mailadres</v-list-item-title>
              <v-list-item-subtitle>Gebruik het e-mailadres dat je hebt opgegeven bij je inschrijving</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Wachtwoord</v-list-item-title>
              <v-list-item-subtitle>Gebruik altijd een sterk en veilig wachtwoord.</v-list-item-subtitle>
              <v-list-item-subtitle>Indicium heeft geen toegang tot wachtwoorden.</v-list-item-subtitle>
              <v-list-item-subtitle>Authenticatie gaat via Google met Firebase.</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-btn type="submit" color="secondary" block class="mt-4">
      Registreren
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth();
const username = ref('');
const password = ref('');

let informationPanel = ref(null);

const openPanel = () => informationPanel.value = [0];

const emit = defineEmits(['register-success']);

const register = () => {
  createUserWithEmailAndPassword(auth, username.value, password.value)
    .then((userCredential) => {
      console.log('User created as: ' + userCredential.user.email);
      emit('register-success');
    })
    .catch((error) => {
      const code = error.code;
      const message = error.message;

      switch (code) {
        case 'auth/email-already-exists':
          window.alert('This email is already in use, if you think this is an error, contact bestuur@indicium.hu');
          break;
        case 'auth/weak-password':
          window.alert('Invalid password. Password must be at least 6 characters long.');
          break;
        default:
          console.error(`User creation failed: ${code} - ${message}`);
          break;
      }
    });
};
</script>
