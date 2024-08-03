<!--Catch-all route-->

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const router = useRouter()

onBeforeMount(() => {
  if (!authStore.isLoggedIn) {
    router.replace('/login')
  } else {
    router.replace('/dashboard')
  }
})
</script>
