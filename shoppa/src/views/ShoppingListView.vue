<template>
  <div v-if="fullList" class="flex flex-col gap-4">
    <h2 class="sticky top-0 left-40 text-5xl">{{ fullList.name }}</h2>
    <div v-if="fullList.items.length > 0">
      <ul class="flex flex-col gap-0.5">
        <li v-for="item in openItems" :key="item.id">
          <ShoppingListItemEntry
            @click="purchase(item)"
            :name="item.name"
            :category="item.category"
          />
        </li>
      </ul>
    </div>
    <div v-else class="text-gray-500">
      <p>Keine Artikel in dieser Liste.</p>
    </div>

    <details v-if="purchasedItems.length > 0" class="mt-8">
      <summary class="cursor-pointer text-lg text-indigo-500">Gekauft</summary>
      <ul class="flex flex-col gap-0.5">
        <li v-for="item in purchasedItems" :key="item.id">
          <PurchasedItemEntry @click="putBack(item)" :name="item.name" />
        </li>
      </ul>
    </details>

    <footer class="sticky right-0 bottom-0 left-0 z-10 flex flex-col gap-2 pb-4">
      <div>
        <label for="category-select" class="text-sm">Kategorie:</label>
        <select id="category-select" class="rounded-sm border p-2" v-model="newItemCategory">
          <option v-for="category in categoryNames" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <select id="shop-select" class="ml-2 rounded-sm border p-2" v-model="newShopName">
          <option v-for="shop in shopNames" :key="shop" :value="shop">
            {{ shop }}
          </option>
        </select>
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
import IconPlus from '@/components/icons/IconPlus.vue'
import PurchasedItemEntry from '@/components/PurchasedItemEntry.vue'
import ShoppingListItemEntry from '@/components/ShoppingListItemEntry.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useShoppingListsStore } from '@/stores/ShoppingListsStore'
import { useShopStore } from '@/stores/ShopStore'
import { type ShoppingListItem } from '@/types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

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

initLists()

const newItemName = ref('')
const newItemCategory = ref('Sonstiges') // Default category
const newShopName = ref('Supermarkt')
function initLists() {
  if (fullList) {
    openItems.value = fullList.items.filter((item) => !item.purchased)
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
    initLists()
  }
}

function purchase(item: ShoppingListItem) {
  item.purchased = true
  initLists()
}
function putBack(item: ShoppingListItem) {
  item.purchased = false
  initLists()
}
</script>

<style scoped></style>
