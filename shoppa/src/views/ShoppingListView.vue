<template>
  <div v-if="list">
    <h2>{{ list.name }}</h2>
    <ul>
      <li v-for="item in list.items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useShoppingListsStore } from '@/stores/ShoppingListsStore'

const shoppingListsStore = useShoppingListsStore()
const list = shoppingListsStore.getListById('1') // Example list ID, replace with actual logic to get the list
</script>

<style scoped></style>
