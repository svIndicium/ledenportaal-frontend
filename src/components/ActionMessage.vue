<template>
  <v-alert v-if="message" :type="type" class="mb-4">
    {{ message }}
  </v-alert>
</template>

<script setup lang="ts">
defineProps<{
  message: string
  type: string
}>();
</script>
