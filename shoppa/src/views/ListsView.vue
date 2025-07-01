<template>
  <div>
    <ul>
      <li v-for="list in lists" :key="list.id">
        <ShoppingListEntry
          @click="router.push({ name: 'shopping-list', params: { id: list.id } })"
          :name="list.name"
          :item-count="list.items.length"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ShoppingListEntry from '@/components/ShoppingListEntry.vue'

import router from '@/router'
import { useShoppingListsStore } from '@/stores/ShoppingListsStore'

const shoppingListsStore = useShoppingListsStore()
const lists = shoppingListsStore.lists
</script>

<style scoped></style>
