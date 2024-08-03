<!--Catch-all route-->

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth } from "firebase/auth";

const router = useRouter()

onMounted(() => {
  if (!getAuth().currentUser) {
    router.push('/login')
  } else {
    router.push('/dashboard')
  }
})
</script>

<template>
  <div>DENIED</div>
</template>
