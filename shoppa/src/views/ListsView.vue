<template>
  <div>
    <h1>Lists Overview</h1>
    <ul>
      <li v-for="list in lists" :key="list.id">
        <router-link :to="{ name: 'shopping-list', params: { id: list.id } }">
          {{ list.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useShoppingListsStore } from '@/stores/ShoppingListsStore'

const shoppingListsStore = useShoppingListsStore()
const lists = shoppingListsStore.lists
</script>

<style scoped></style>
