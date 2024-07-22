<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="500">
      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">
          Welcome to Indicium
        </div>
        <h1 class="text-h2 font-weight-bold">Ledenportaal</h1>
      </div>

      <div class="py-6" />
      <div v-if="!authStore.isLoggedIn">
        <div class="text-center">
          <v-text-field
            v-model="username"
            label="E-mailadres"
            outlined
            dense
            hide-details
          />
        </div>
        <p class="text-left text-caption">
          Gebruik het e-mailadres dat je hebt opgegeven bij je inschrijving.
        </p>
        <div class="py-2" />
        <div class="text-center">
          <v-text-field
            v-model="password"
            label="Wachtwoord"
            outlined
            dense
            hide-details
            type="password"
          />
        </div>
        <div class="py-4" />
        <v-row justify="center" class="mb-4">
          <v-col cols="auto">
            <v-btn color="primary" @click="login"> Inloggen </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="secondary" variant="outlined" @click="register">
              Registreren
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row justify="center" class="mb-4">
          <v-col cols="auto">
            <v-btn color="primary" @click="logout"> Uitloggen </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth"; // Adjust the import path as needed
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");

onMounted(() => {
  authStore.initializeAuthListener();
});

function login() {
  signInWithEmailAndPassword(auth, username.value, password.value)
    .then((userCredential) => {
      console.log("User logged-in as: " + userCredential.user.email);
    })
    .catch((error) => {
      console.log("User login failed: " + error.code + " - " + error.message);
    });
}

function register() {
  createUserWithEmailAndPassword(auth, username.value, password.value)
    .then((userCredential) => {
      console.log("User created as: " + userCredential.user.email);
    })
    .catch((error) => {
      console.log(
        "User creation failed: " + error.code + " - " + error.message
      );
    });
}

function logout() {
  auth
    .signOut()
    .then(() => {
      console.log("logged out");
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
