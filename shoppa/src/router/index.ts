import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/',
      name: 'lists',
      component: () => import('../views/ListsView.vue'),
    },
    {
      path: '/lists/:id',
      name: 'shopping-list',
      component: () => import('../views/ShoppingListView.vue'),
    },
  ],
})

export default router
