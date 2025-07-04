<template>
  <header class="flex items-center justify-center gap-2 p-4">
    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500">H</div>
    <h1 class="text-center">Username</h1>
  </header>
  <div>
    <ul v-if="lists.length > 0" class="flex flex-col gap-1">
      <li v-for="list in lists" :key="list.id">
        <ShoppingListEntry
          @click="router.push({ name: 'shopping-list', params: { id: list.id } })"
          :name="list.name"
          :item-count="list.items.length"
        />
      </li>
    </ul>
    <p v-else class="text-center text-gray-500">Keine Listen vorhanden</p>
  </div>
  <div class="flex items-center justify-between px-6">
    <input
      type="text"
      placeholder="+ Neue Liste erstellen"
      class="w-full rounded p-2 placeholder:text-indigo-500 focus:outline-0"
      v-model="newListName"
      @keyup.enter="addList"
      @keyup.esc="newListName = ''"
    /><ButtonSubmitSmall @click="addList" />
  </div>
</template>

<script setup lang="ts">
import ButtonSubmit from '@/components/ButtonSubmit.vue'
import ButtonSubmitSmall from '@/components/ButtonSubmitSmall.vue'
import ShoppingListEntry from '@/components/ShoppingListEntry.vue'

import router from '@/router'
import { useShoppingListsStore } from '@/stores/ShoppingListsStore'
import { ref } from 'vue'

const shoppingListsStore = useShoppingListsStore()
const lists = shoppingListsStore.lists

const newListName = ref('')

function addList() {
  if (newListName.value.trim() === '') return
  shoppingListsStore.addList({
    id: generateId(),
    name: newListName.value,
    items: [],
    authors: [],
    dateCreated: new Date().toISOString(),
  })
  newListName.value = ''
}

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // Fallback: simple UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
</script>

<style scoped></style>
