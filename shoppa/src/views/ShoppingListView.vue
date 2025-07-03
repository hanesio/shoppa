<template>
  <div v-if="fullList" class="flex flex-col gap-4">
    <h2 class="sticky top-0 left-40 text-5xl">{{ fullList.name }}</h2>

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

    <footer class="sticky right-0 bottom-0 left-0 z-10 flex flex-col gap-2 border-t pb-4">
      <div>
        <PillSelect
          :items="categoryNames"
          v-model="newItemCategory"
          :color="{ bg: 'bg-blue-200', text: 'text-blue-900', border: 'border-blue-400' }"
        />
        <PillSelect
          :items="shopNames"
          v-model="newShopName"
          :color="{ bg: 'bg-rose-200', text: 'text-rose-900', border: 'border-rose-400' }"
        />
      </div>
      <div class="justiy-end flex items-center gap-2">
        <input
          type="text"
          placeholder="1kg Mehl"
          class="w-full rounded-sm border p-2"
          v-model="newItemName"
          @keyup.enter="addItem"
          @keyup.esc="newItemName = ''"
        />
        <button
          @click="addItem"
          class="flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full bg-lime-500 p-2 text-center text-4xl active:scale-90"
        >
          <IconPlus class="h-8 w-8 text-white" />
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import PillSelect from '@/components/PillSelect.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import PurchasedItemEntry from '@/components/PurchasedItemEntry.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useShoppingListsStore } from '@/stores/ShoppingListsStore'
import { useShopStore } from '@/stores/ShopStore'
import { type ShoppingListItem } from '@/types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SortedShoppingList from '@/components/SortedShoppingList.vue'

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

const newItemName = ref('')
const newItemCategory = ref('Sonstiges') // Default category
const newShopName = ref('Supermarkt')

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

function addItem() {
  if (newItemName.value != '') {
    shoppingListsStore.addItemToList(listId, {
      name: newItemName.value,
      category: newItemCategory.value,
      shopId: '1',
      purchased: false,
      dateAdded: new Date().toISOString(),
      shopName: newShopName.value,
      author: 'Max Mustermann',
    })

    newItemName.value = ''

    updateLists()
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
</script>

<style scoped></style>
