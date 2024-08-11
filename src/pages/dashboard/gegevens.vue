<template>
  <div v-if="currentUser?.emailVerified">
    <!-- Protected content here -->
    <h1>Gegevenspagina placeholder</h1>
    <p>Alleen zichtbaar met een geverifieerd adres, naast de back-end check.</p>
  </div>
  <VerifiedEmailCheck v-else />
</template>

<script setup lang="ts">
import { useCurrentUser } from 'vuefire';
const currentUser = useCurrentUser();

</script>
