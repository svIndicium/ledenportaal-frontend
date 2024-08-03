/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// Using ts expect error because the error is false, don't know how to fix.
// Expect error over ignore because TS will warn us if the comment is no longer needed.
// @ts-expect-error
import { createRouter, createWebHistory } from "vue-router/auto";
// @ts-expect-error
import { setupLayouts } from "virtual:generated-layouts";
import { useCurrentUser } from "vuefire";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
});

// Navigation guard for auth
router.beforeEach(async (to) => {
  const currentUser = useCurrentUser();
  if (to.meta.requiresAuth && !currentUser.value) {
    // If not logged in, redirect to /login
    router.push("/login")
  } else if (to.path === "/login" && currentUser.value) {
    // If already logged in, redirect to /dashboard
     router.push("/dashboard")
  }
})

export default router;
