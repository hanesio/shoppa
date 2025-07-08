<template>
  <div>
    <ul v-if="shoppingListsStore.lists.length > 0" class="flex flex-col gap-1">
      <li v-for="list in shoppingListsStore.lists" :key="list.id">
        <button @click="showInvite(list.id, list.name)">Invite</button>

        <ShoppingListInvite
          v-if="currentInviteListId === list.id"
          :list-id="list.id"
          :list-name="list.name"
        />

        <ShoppingListEntry
          @click="router.push({ name: 'shopping-list', params: { id: list.id } })"
          :name="list.name"
          :list-id="list.id"
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
import ButtonSubmitSmall from '@/components/ButtonSubmitSmall.vue'
import ShoppingListEntry from '@/components/ShoppingListEntry.vue'
import ShoppingListInvite from '@/components/ShoppingListInvite.vue'

import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { useShoppingListsStore } from '@/stores/shoppingListsStore'
import { onMounted, reactive, ref } from 'vue'

const shoppingListsStore = useShoppingListsStore()
const authStore = useAuthStore()

const newListName = ref('')
const currentInviteListId = ref<string | null>(null)

const showInvite = (listId: string, listName: string) => {
  currentInviteListId.value = listId // Show invite component for this list
}

async function addList() {
  if (newListName.value.trim() === '') return
  const id = await shoppingListsStore.addList(newListName.value)
  // Reset the input field after adding the list
  newListName.value = ''
  router.push({ name: 'shopping-list', params: { id } })
}
</script>

<style scoped></style>
