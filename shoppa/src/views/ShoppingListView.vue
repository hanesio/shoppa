<template>
  <div v-if="fullList" class="flex flex-col gap-4">
    <h2 class="sticky top-0 left-40 z-10 bg-white py-2 text-5xl text-indigo-700">
      {{ fullList.name }}
    </h2>

    <SortedShoppingList
      @purchase="updateLists"
      v-if="fullList.items.length > 0"
      :sorted-lists="listsByShops"
    />

    <div v-else class="text-gray-500">
      <p>Keine Artikel in dieser Liste.</p>
    </div>

    <details v-if="purchasedItems.length > 0">
      <summary class="cursor-pointer text-lg text-indigo-500">Gekauft</summary>
      <ul class="flex flex-col gap-0.5">
        <li v-for="item in purchasedItems" :key="item.id">
          <PurchasedItemEntry @click="putBack(item)" :name="item.name" />
        </li>
      </ul>
    </details>

    <AddItemBar
      ref="target"
      class="fixed bottom-0 left-0 z-50 transition"
      :class="[showAddItemBar ? 'translate-y-0' : 'translate-y-full']"
      @addItem="updateLists"
      :shop-names
      :category-names
      :list-id
      :focus="showAddItemBar"
    />

    <button
      class="fixed right-5 bottom-5 flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full bg-indigo-500 p-2 text-center text-4xl active:scale-90"
      @click="toggleAddItemBar"
    >
      <IconPlus class="h-8 w-8 text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import PurchasedItemEntry from '@/components/PurchasedItemEntry.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useShoppingListsStore } from '@/stores/ShoppingListsStore'
import { useShopStore } from '@/stores/ShopStore'
import { type ShoppingListItem } from '@/types'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SortedShoppingList from '@/components/SortedShoppingList.vue'
import AddItemBar from '@/components/AddItemBar.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const route = useRoute()
const listId = route.params.id as string

const shoppingListsStore = useShoppingListsStore()
const fullList = shoppingListsStore.getListById(listId)
const openItems = ref<ShoppingListItem[]>([])
const purchasedItems = ref<ShoppingListItem[]>([])

const categoryStore = useCategoryStore()
const categoryNames = categoryStore.categories.map((category) => category.name)
const shopStore = useShopStore()
const shopNames = shopStore.shops.map((shop) => shop.name)

// Create a list of items grouped by shop names
const listsByShops = ref<{ shopName: string; items: ShoppingListItem[] }[]>([])

const target = useTemplateRef<HTMLElement>('target')
const showAddItemBar = ref(false)

updateLists()

function updateLists() {
  if (fullList) {
    openItems.value = fullList.items.filter((item) => !item.purchased)
    // Group items by shop names
    listsByShops.value = sortListByShops(openItems.value)
    // Filter purchased items
    purchasedItems.value = fullList.items.filter((item) => item.purchased)
  }
}

function purchase(item: ShoppingListItem) {
  item.purchased = true
  updateLists()
}
function putBack(item: ShoppingListItem) {
  item.purchased = false
  updateLists()
}

function sortListByShops(items: ShoppingListItem[]) {
  const result: { shopName: string; items: ShoppingListItem[] }[] = []
  shopNames.forEach((shopName) => {
    const shopItems = items.filter((item) => item.shopName === shopName)
    if (shopItems.length === 0) return
    // Sort items by category
    shopItems.sort((a, b) => {
      const categoryA = categoryStore.categories.find((c) => c.name === a.category)
      const categoryB = categoryStore.categories.find((c) => c.name === b.category)
      return (categoryA?.order || 0) - (categoryB?.order || 0)
    })

    result.push({ shopName, items: shopItems })
  })
  return result
}

function toggleAddItemBar() {
  showAddItemBar.value = true
}

interface ClickOutsideEvent extends MouseEvent {}

onClickOutside(target, (event: ClickOutsideEvent) => (showAddItemBar.value = false))
</script>

<style scoped></style>
