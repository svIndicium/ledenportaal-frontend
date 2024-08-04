<template>
  <v-container>
    <v-responsive class="align-center mx-auto" max-width="800">
      <h1 class="text-h3 mb-6">User Dashboard</h1>
      <p class="text-body-1">
        Logged in as {{ user.displayName }}: {{ conscriboId }}
      </p>
      <v-row justify="center" class="mt-6">
        <v-col cols="auto">
          <v-btn color="primary" @click="logout">Uitloggen</v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref} from "vue";
import { useRouter } from 'vue-router';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';
import { definePage } from "unplugin-vue-router/runtime";

definePage({
  meta: { requiresAuth: true },
})

const auth = useFirebaseAuth();
const user = useCurrentUser();
const router = useRouter();

const conscriboId = ref(null);

onMounted(async () => {
  if (user.value) {
    const result = await user.value.getIdTokenResult()
    conscriboId.value = result.claims.conscriboId
  }
})

const logout = () => {
  auth.signOut().then(() => {
    console.log('logged out');
    router.push('/login');
  }).catch((error) => {
    console.log(error);
  });
};
</script>
