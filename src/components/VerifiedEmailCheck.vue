<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title class="headline">Nog geen toegang</v-card-title>
          <v-card-text>
            <p>Je e-mail is nog niet geverifieerd. Verifieer je email voordat je verdergaat.</p>
            <v-progress-circular
              indeterminate
              color="primary"
              class="mt-4"
            ></v-progress-circular>
            <p class="mt-4">Klik op onderstaande knop voor een nieuwe verificatie-email.</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="resendVerificationEmail">
              Verzend Verificatie-Email
            </v-btn>
            <v-btn color="secondary" @click="reloadPage">
              Refresh
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { sendEmailVerification } from 'firebase/auth';
import { useCurrentUser } from "vuefire";

const router = useRouter();

const resendVerificationEmail = async () => {
  const user = useCurrentUser();
  if (user) {
    sendEmailVerification(user.value)
      .then(() => {
        alert('Verificatie-email verzonden. Check je inbox!');
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error('Error bij verzenden van verificatie-email:', error);
        alert('Error bij verzenden van verificatie-email.' +
          ' Je moet hiervoor ingelogd zijn en een ongeverifieerd e-mailadres hebben.' +
          ' Ververs de pagina als je email al geverifieerd is.'
        );
      });
  }
};

const reloadPage = () => {
  location.reload();
}

</script>
