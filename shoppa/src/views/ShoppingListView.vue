<template>
  <div v-if="list" class="flex flex-col gap-4">
    <h2 class="text-5xl">{{ list.name }}</h2>

    <ul class="flex flex-col gap-0.5">
      <li v-for="item in list.items" :key="item.id">
        <div
          class="flex items-center justify-end gap-4 rounded-sm bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          <span>{{ item.name }}</span>
          <input type="checkbox" class="mr-2" />
        </div>
      </li>
    </ul>
    <div
      class="absolute right-0 bottom-0 left-0 flex items-center justify-between gap-2 bg-white p-4"
    >
      <input
        type="text"
        placeholder="+ Artikel hinzufügen"
        class="rounded-sm border p-4"
        v-model="newItemName"
      />
      <button
        @click="addItem"
        class="flex h-16 w-16 items-center justify-center rounded-full bg-lime-500 p-2 text-center text-4xl active:scale-90"
      >
        <IconPlus class="h-8 w-8 text-white" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconPlus from '@/components/icons/IconPlus.vue'
import { useShoppingListsStore } from '@/stores/ShoppingListsStore'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const listId = route.params.id as string

const shoppingListsStore = useShoppingListsStore()
const list = shoppingListsStore.getListById(listId)

const newItemName = ref('')

function addItem() {
  shoppingListsStore.addItemToList(listId, {
    name: newItemName.value,
    category: 'Obst & Gemüse',
    shopId: '1',
    purchased: false,
    dateAdded: new Date().toISOString(),
    shopName: 'Rewe',
    author: 'Max Mustermann',
  })
}
</script>

<style scoped></style>
