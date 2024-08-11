<template>
  <v-container class="fill-height pa-2 pa-sm-3">
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12" style="max-width: 500px;">
        <v-responsive class="align-center text-center">
          <div class="text-body-2 font-weight-light mb-n1">
            Welkom bij Indicium
          </div>
          <h1 class="text-h3 text-sm-h3 text-md-h2 font-weight-bold">Ledenportaal</h1>

          <div class="py-4" />

          <v-tabs v-model="tab" centered>
            <v-tab value="login">Login</v-tab>
            <v-tab value="register">Register</v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="login">
              <LoginForm @login-success="onLoginSuccess" />
            </v-window-item>
            <v-window-item value="register">
              <RegisterForm @register-success="onRegisterSuccess" />
            </v-window-item>
          </v-window>

          <v-row justify="center" class="mt-4">
            <v-col cols="auto">
              <v-btn block> Wachtwoord vergeten </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn @click="ping" block> {{ result }} </v-btn>
            </v-col>
          </v-row>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../main';

const router = useRouter();
const tab = ref('login');
const result = ref('Ping');

const onLoginSuccess = () => {
  router.push('/dashboard');
};

const onRegisterSuccess = () => {
  router.push('/dashboard');
};

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
</script>
