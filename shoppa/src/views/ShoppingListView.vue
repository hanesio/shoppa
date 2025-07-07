<template>
  <div v-if="fullList" class="flex h-screen flex-col gap-4">
    <div
      class="fixed top-0 left-0 z-10 flex w-full items-center justify-between gap-2 bg-white px-4"
    >
      <button @click="router.push('/')">
        <IconArrowRight class="h-8 w-8 rotate-180 cursor-pointer text-indigo-500" />
      </button>
      <h1 class="bg-white py-2 text-xl text-indigo-700">
        {{ fullList.name }}
      </h1>
      <ButtonTrash @click="deleteList" />
    </div>
    <div class="mt-16">
      <AddItemBar
        ref="target"
        class="z-50 transition"
        :class="[showAddItemBar ? 'translate-y-0' : 'fixed bottom-0 left-0 translate-y-full']"
        @addItem="updateLists"
        :shop-names
        :category-names
        :list-id
        :focus="showAddItemBar"
      />

      <div class="flex w-full flex-col justify-between gap-1 lg:flex-row">
        <SortedShoppingList
          @purchase="updateLists"
          @showDetails="
            router.push({
              name: 'item-details',
              params: { itemId: $event.id, listId: listId },
            })
          "
          v-if="fullList.items.length > 0"
          :sorted-lists="listsByShops"
        />

        <p v-else class="mx-auto text-center text-gray-500">Keine Artikel in dieser Liste</p>
      </div>
      <details v-if="purchasedItems.length > 0">
        <summary class="cursor-pointer text-lg text-indigo-500">Gekauft</summary>
        <ul class="flex flex-col gap-0.5">
          <li v-for="item in purchasedItems" :key="item.id">
            <PurchasedItemEntry
              @put-back="putBack(item)"
              @show-details="
                router.push({
                  name: 'item-details',
                  params: { itemId: item.id, listId: listId },
                })
              "
              :name="item.name"
            />
          </li>
        </ul>
      </details>

      <button
        class="fixed right-5 bottom-5 flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full bg-indigo-500 p-2 text-center text-4xl active:scale-90"
        @click="toggleAddItemBar"
      >
        <IconPlus class="h-8 w-8 text-white" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PurchasedItemEntry from '@/components/PurchasedItemEntry.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useShoppingListsStore } from '@/stores/ShoppingListsStore'
import { useShopStore } from '@/stores/ShopStore'
import { type ShoppingListItem } from '@/types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SortedShoppingList from '@/components/SortedShoppingList.vue'
import AddItemBar from '@/components/AddItemBar.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import { useRouter } from 'vue-router'
import ButtonTrash from '@/components/ButtonTrash.vue'

const route = useRoute()
const router = useRouter()
const listId = route.params.id as string

const shoppingListsStore = useShoppingListsStore()
let fullList = shoppingListsStore.getListById(listId)
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

async function updateLists() {
  await shoppingListsStore.listenForLists()
  fullList = shoppingListsStore.getListById(listId)
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

function deleteList() {
  shoppingListsStore.deleteList(listId)
  router.push('/')
}

interface ClickOutsideEvent extends MouseEvent {}
onClickOutside(target, (event: ClickOutsideEvent) => (showAddItemBar.value = false))
</script>

<style scoped></style>
