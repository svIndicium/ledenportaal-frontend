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
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const password = ref("");

function login() {
  console.log("login dummy function");
}

function register() {
  console.log("register dummy function");
}
</script>
