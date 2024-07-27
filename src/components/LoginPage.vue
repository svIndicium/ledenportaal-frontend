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
          <v-text-field v-model="username" label="E-mailadres" outlined dense
            ><template #details>
              Gebruik het e-mailadres dat je hebt opgegeven bij je inschrijving.
            </template></v-text-field
          >
        </div>
        <div class="py-2" />
        <div class="text-center">
          <v-text-field
            v-model="password"
            label="Wachtwoord"
            outlined
            dense
            hide-details="auto"
            type="password"
            ><template #details class="error">
              This is where an error can be shown.
            </template></v-text-field
          >
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
          <v-col cols="auto">
            <v-btn @click="ping"> {{ result }} </v-btn>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <p class="text-center">
          Logged in as {{ conscriboId }}::
          {{ auth.currentUser?.email }}
        </p>
        <div class="py-4" />
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
import { ref, onMounted, watchEffect } from "vue";
import { useAuthStore } from "../stores/auth"; // Adjust the import path as needed
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { httpsCallable } from "firebase/functions";

import { functions } from "../main";

const auth = getAuth();
const authStore = useAuthStore();
const conscriboId = ref();

const username = ref("");
const password = ref("");

const result = ref("Ping");

const updateConscriboId = async () => {
  if (auth.currentUser) {
    try {
      const result = await auth.currentUser.getIdTokenResult();
      conscriboId.value = result?.claims?.conscriboId || null;
    } catch (error) {
      console.error("Failed to get conscriboId:", error);
      conscriboId.value = null;
    }
  } else {
    conscriboId.value = null;
  }
};

watchEffect(() => {
  updateConscriboId();
});

const ping = async () => {
  result.value = "Pinging...";
  const startTime = performance.now();
  try {
    interface PingResponse {
      message: string;
    }
    const { data } = await httpsCallable<void, PingResponse>(
      functions,
      "ping"
    )(); // direct invocation of function
    const responseTime = (performance.now() - startTime).toFixed(2);
    result.value = `${data.message} : ${responseTime} ms`;
  } catch (error) {
    console.error("Error calling function:", error);
    result.value = "Error: " + error.message;
  }
};

onMounted(async () => {
  authStore.initializeAuthListener();
});

function login() {
  signInWithEmailAndPassword(auth, username.value, password.value)
    .then((userCredential) => {
      console.log("User logged-in as: " + userCredential.user.email);
    })
    .catch((error) => {
      const code = error.code;
      const message = error.message;

      switch (code) {
        case "auth/network-request-failed":
          window.alert(
            "Could not connect to the authentication server. Is your internet down?"
          );
          break;
        case "auth/invalid-email":
          window.alert("Invalid email format.");
          break;
        case "auth/missing-password":
          window.alert("Please input a password.");
          break;
        case "auth/user-not-found":
          window.alert("User does not exist, please register.");
          break;
        case "auth/user-disabled":
          window.alert("User has been disabled, contact bestuur@indicium.hu");
          break;
        default:
          console.error(`User login failed: ${code} - ${message}`);
          break;
      }
    });
}

function register() {
  createUserWithEmailAndPassword(auth, username.value, password.value)
    .then((userCredential) => {
      console.log("User created as: " + userCredential.user.email);
    })
    .catch((error) => {
      const code = error.code;
      const message = error.message;

      switch (code) {
        case "auth/email-already-exists":
          window.alert(
            "This email is already in use, if you think this is an error, contact bestuur@indicium.hu"
          );
          break;
        case "auth/weak-password":
          window.alert(
            "Invalid password. Password must be at least 6 characters long."
          );
          break;
        default:
          console.error(`User creation failed: ${code} - ${message}`);
          break;
      }
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
