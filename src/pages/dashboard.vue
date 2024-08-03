<template>
  <v-container>
    <v-responsive class="align-center mx-auto" max-width="800">
      <h1 class="text-h3 mb-6">User Dashboard</h1>
      <p class="text-body-1">
        Logged in as {{ conscriboId }}:: {{ auth.currentUser?.email }}
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
import { ref, onMounted, watchEffect } from 'vue';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = getAuth();
const conscriboId = ref();

defineOptions({
  meta: {
    requiresAuth: true
  }
})

onMounted(() => {
  if (!auth.currentUser) {
    router.push('/login');
  }
});

const updateConscriboId = async () => {
  if (auth.currentUser) {
    try {
      const result = await auth.currentUser.getIdTokenResult();
      conscriboId.value = result?.claims?.conscriboId || null;
    } catch (error) {
      console.error('Failed to get conscriboId:', error);
      conscriboId.value = null;
    }
  } else {
    conscriboId.value = null;
  }
};

watchEffect(() => {
  updateConscriboId();
});

// function getConscriboData() {
//   httpsCallable(functions, 'retrieveRelationData').call("<TARGET_conscriboId_HERE>")
//     .then((result) => {
//       const data = result.data;
//     })
// }

const logout = () => {
  auth.signOut().then(() => {
    console.log('logged out');
    router.push('/login');
  }).catch((error) => {
    console.log(error);
  });
};
</script>
