import { defineStore } from "pinia";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    initializeAuthListener() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.user = user;
      });
    },
    setUser(user: User | null) {
      this.user = user;
    },
  },
});
