<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between px-6">
      <input
        type="text"
        placeholder="Neue Liste erstellen"
        class="w-full rounded p-2 placeholder:text-indigo-500 focus:outline-0"
        v-model="newListName"
        @keyup.enter="addList"
        @keyup.esc="newListName = ''"
      /><IconPlus class="size-8 cursor-pointer text-indigo-500" @click="addList" />
    </div>
    <div
      v-if="shoppingListsStore.lists.length > 0"
      class="grid grid-cols-2 gap-1 lg:flex lg:flex-wrap lg:gap-4"
    >
      <ShoppingListCard
        v-for="list in shoppingListsStore.lists"
        :key="list.id"
        @show-list="showList(list.id)"
        :name="list.name"
        :list-id="list.id"
        :item-count="list.items.length"
        :items="list.items"
      />
    </div>
    <p v-else class="text-center text-gray-500">Keine Listen vorhanden</p>
  </div>
</template>

<script setup lang="ts">
import ShoppingListCard from '@/components/ShoppingListCard.vue'

import { useRouter } from 'vue-router'
import { useShoppingListsStore } from '@/stores/shoppingListsStore'
import { ref } from 'vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const router = useRouter()
const shoppingListsStore = useShoppingListsStore()

const newListName = ref('')

async function addList() {
  if (newListName.value.trim() === '') return
  const id = await shoppingListsStore.addList(newListName.value)
  // Reset the input field after adding the list
  newListName.value = ''
  router.push({ name: 'shopping-list', params: { id } })
}

function showList(listId: string) {
  router.push({ name: 'shopping-list', params: { id: listId } })
}
</script>

<style scoped></style>
