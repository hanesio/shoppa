import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/lists',
      name: 'lists',
      component: () => import('../views/ListsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/lists/:id',
      name: 'shopping-list',
      component: () => import('../views/ShoppingListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/lists/:listId/items/:itemId',
      name: 'item-details',
      component: () => import('../views/ItemDetailsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route for 404s
      name: 'NotFound',
      redirect: '/', // Redirect to login if route not found
    },
  ],
})

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore() // Get the auth store instance

  // Ensure Firebase Auth state is initialized before proceeding
  // This is crucial for handling initial page load and refreshes
  // We wait until authLoading is false, meaning Firebase has checked for a user.
  if (authStore.authLoading) {
    await new Promise<void>((resolve) => {
      // Wait for authLoading to become false
      const unsubscribe = authStore.$subscribe((mutation, state) => {
        if (!state.authLoading) {
          unsubscribe() // Stop listening once loading is false
          resolve()
        }
      })
      // If authLoading is already false, resolve immediately (e.g., during subsequent navigations)
      if (!authStore.authLoading) {
        resolve()
      }
    })
  }

  const isLoggedIn = !!authStore.currentUser // Convert currentUser object to a boolean

  // Determine if the route requires authentication
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isLoggedIn) {
    // If the route requires auth AND the user is NOT logged in, redirect to login
    next({ name: 'login' })
  } else if (!requiresAuth && isLoggedIn) {
    // If the route does NOT require auth (like login/register) AND the user IS logged in, redirect to lists
    next({ name: 'lists' })
  } else {
    // Otherwise, allow navigation
    next()
  }
})

export default router
