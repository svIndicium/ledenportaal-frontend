import { defineStore } from 'pinia'
import { useCurrentUser } from 'vuefire'
import { computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = useCurrentUser();

  // Alternative to useCurrentUser().value
  const isLoggedIn = computed(() => !!user.value);

  return { user, isLoggedIn }
})
