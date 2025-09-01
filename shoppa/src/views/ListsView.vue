<template>
  <header class="fixed top-0 left-0 z-20 w-full">
    <AuthButtons @open-settings="settingsOpen = true" />
  </header>

  <div class="gap-4npm run mt-18 flex flex-col decoration-violet-50">
    <div class="flex items-center justify-between px-6 lg:w-80">
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
  <ModalAccountSettings @close="closeAccountSettings()" :dialog-open="settingsOpen" />
</template>

<script setup lang="ts">
import AuthButtons from '@/components/AuthButtons.vue'
import ShoppingListCard from '@/components/ShoppingListCard.vue'

import { useRouter } from 'vue-router'
import { useShoppingListsStore } from '@/stores/shoppingListsStore'
import { ref } from 'vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import ModalAccountSettings from '@/components/ModalAccountSettings.vue'

const router = useRouter()
const shoppingListsStore = useShoppingListsStore()

const newListName = ref('')
const settingsOpen = ref(false)

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

function closeAccountSettings() {
  settingsOpen.value = false
}
</script>

<style scoped></style>
