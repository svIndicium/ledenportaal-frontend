<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>{{ title }}</v-card-title>
          <v-card-text>
            <ActionMessage :message="message" :type="alertType" />
            <VerifyEmailAction v-if="mode === 'verifyEmail'"
                         :action-code="actionCode"
                         @verified="onActionComplete"
                         @error="onError" />
            <ResetPasswordAction v-if="mode === 'resetPassword'"
                           :action-code="actionCode"
                           @reset="onActionComplete"
                           @error="onError" />
          </v-card-text>
          <v-card-actions v-if="showContinueButton">
            <v-btn color="primary" @click="handleContinue"> Naar dashboard </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const mode = route.query.mode as string;
const actionCode = route.query.oobCode as string;
const continueUrl = route.query.continueUrl as string;

const title = ref('');
const message = ref('');
const alertType = ref('info');
const showContinueButton = ref(false);

onMounted(() => {
  setTitle();
});

const setTitle = () => {
  switch (mode) {
    case 'resetPassword':
      title.value = 'Reset Wachtwoord';
      break;
    case 'verifyEmail':
      title.value = 'Verifieer Email';
      break;
    default:
      title.value = 'Ongeldige Actie';
      message.value = 'Ongeldige actie';
      alertType.value = 'error';
  }
};

const onActionComplete = (msg: string) => {
  message.value = msg;
  alertType.value = 'success';
  showContinueButton.value = true;
};

const onError = (error: string) => {
  message.value = error;
  alertType.value = 'error';
};

const handleContinue = () => {
  if (continueUrl) {
    router.push(continueUrl);
  } else {
    router.push('/dashboard'); // Or any default route
  }
};
</script>
