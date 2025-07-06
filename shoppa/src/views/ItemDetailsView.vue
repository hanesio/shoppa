<template>
  <div class="flex h-screen">
    <div
      class="fixed top-0 left-0 z-10 flex w-full items-center justify-between gap-2 bg-white px-4"
    >
      <button @click="router.push(`/lists/${listId}`)">
        <IconArrowRight class="h-8 w-8 rotate-180 cursor-pointer text-indigo-500" />
      </button>
      <h1 class="bg-white py-2 text-4xl text-indigo-700">
        {{ listName }}
      </h1>
      <div class="h-8 w-8"></div>
    </div>

    <div class="mt-16 flex w-full flex-col justify-between gap-4">
      <ShoppingListItemDetailInput
        v-if="item"
        :category="categoryStore.getCategoryByName(item.category)"
        v-model="itemName"
        :purchased="item.purchased"
        @updateItem="shoppingListsStore.updateItem(listId, itemId, itemName)"
        @purchase="purchase(item)"
        @put-back="putBack(item)"
      />
      <p v-else class="text-gray-500">Artikel nicht gefunden</p>
      <div class="flex items-center justify-between p-3">
        <ul>
          <li>hinzugefügt von {{ item?.author }}</li>
          <li>am {{ dateAdded }}</li>
        </ul>
        <ButtonTrash size-class="h-12 w-12" @click="deleteItem" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useShoppingListsStore } from '@/stores/ShoppingListsStore'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import ShoppingListItemDetailInput from '@/components/ShoppingListItemDetailInput.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { ref } from 'vue'
import type { ShoppingListItem } from '@/types'
import ButtonTrash from '@/components/ButtonTrash.vue'

const router = useRouter()
const route = useRoute()
const listId = route.params.listId as string
const itemId = route.params.itemId as string

const shoppingListsStore = useShoppingListsStore()
const listName = shoppingListsStore.getListById(listId)?.name || 'Liste'
const item = shoppingListsStore.getItemById(listId, itemId)

const itemName = ref(item ? item.name : '')
const dateAdded = ref(
  item
    ? new Date(item.dateAdded).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : 'Unbekannt',
)

const categoryStore = useCategoryStore()

function purchase(item: ShoppingListItem) {
  item.purchased = true
}
function putBack(item: ShoppingListItem) {
  item.purchased = false
  // shoppingListsStore.updateItem(listId, itemId, item.name)
}
function deleteItem() {
  shoppingListsStore.deleteItem(listId, itemId)
  router.push(`/lists/${listId}`)
}
</script>

<style scoped></style>
