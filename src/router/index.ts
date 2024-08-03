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
import { getAuth } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
});

// Navigation guard for auth
router.beforeEach((to, from, next) => {
  const auth = getAuth();

  if (to.meta.requiresAuth && !auth.currentUser) {
    next('/login')
  } else if (to.path === '/login' && auth.currentUser) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router;
