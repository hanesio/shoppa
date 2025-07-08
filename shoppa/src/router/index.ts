import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/lists',
      name: 'lists',
      component: () => import('../views/ListsView.vue'),
    },
    {
      path: '/lists/:id',
      name: 'shopping-list',
      component: () => import('../views/ShoppingListView.vue'),
    },
    {
      path: '/lists/:listId/items/:itemId',
      name: 'item-details',
      component: () => import('../views/ItemDetailsView.vue'),
    },
  ],
})

export default router
