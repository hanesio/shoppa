<template>
  <div
    v-if="openItems || purchasedItems"
    class="relative flex min-h-[calc(100vh_-_72px)] flex-col gap-4"
  >
    <div
      class="fixed top-12 left-0 z-10 flex w-full items-center justify-between gap-2 bg-white px-4 py-3"
    >
      <button @click="router.push('/lists')">
        <IconArrowRight class="h-8 w-8 rotate-180 cursor-pointer text-indigo-500" />
      </button>
      <input
        v-if="list"
        type="text"
        v-model="listName"
        @change="updateListName"
        class="w-full border-b-2 border-indigo-300 bg-white py-2 text-center text-xl text-indigo-700 focus:outline-0"
      />

      <ButtonTrash @click="deleteList" />
    </div>
    <AddItemBar
      class="fixed top-28 left-0 z-50 transition duration-300 ease-in-out"
      :class="[showAddItemBar ? 'translate-y-0' : '-translate-y-70']"
      :shop-names
      :category-names
      :list-id
      :focus="showAddItemBar"
      :bar-open="showAddItemBar"
      @close="showAddItemBar = false"
    />

    <div class="mt-10">
      <div class="flex w-full flex-col justify-between gap-1 lg:flex-row">
        <SortedShoppingList
          @showDetails="
            router.push({
              name: 'item-details',
              params: { itemId: $event.id, listId: listId },
            })
          "
          v-if="listsByShops.length > 0"
          :sorted-lists="listsByShops"
          :list-id
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

      <div class="h-24"></div>

      <div
        v-if="showAddItemBar"
        class="fixed top-0 left-0 z-40 h-screen w-screen bg-black opacity-50"
      ></div>

      <button
        v-if="!showAddItemBar"
        class="fixed right-5 bottom-5 z-10 flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-indigo-500 p-2 text-center text-4xl active:scale-90"
        @click="toggleAddItemBar"
      >
        <IconPlus class="h-7 w-7 text-white" />
      </button>
    </div>
    <footer class="absolute bottom-0 w-full">
      <p class="py-4 text-center text-sm text-gray-400">
        Einkauf für
        <span class="text-gray-500" v-for="(authorUid, index) in authors" :key="authorUid">
          {{ getAuthorDisplayName(authorUid) }}<span v-if="index < authors.length - 1">, </span>
        </span>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import PurchasedItemEntry from '@/components/PurchasedItemEntry.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useShoppingListsStore } from '@/stores/shoppingListsStore'
import { useShopStore } from '@/stores/shopStore'
import { useAuthStore } from '../stores/authStore'
import { type ShoppingListItem } from '@/types'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SortedShoppingList from '@/components/SortedShoppingList.vue'
import AddItemBar from '@/components/AddItemBar.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import { useRouter } from 'vue-router'
import ButtonTrash from '@/components/ButtonTrash.vue'

const route = useRoute()
const router = useRouter()
const listId = route.params.id as string

const shoppingListsStore = useShoppingListsStore()

const categoryStore = useCategoryStore()
const categoryNames = categoryStore.categories.map((category) => category.name)

const shopStore = useShopStore()
const shopNames = shopStore.shops.map((shop) => shop.name)

const authStore = useAuthStore()

const showAddItemBar = ref(false)

const openItems = computed(() => {
  const list = shoppingListsStore.getListById(listId)
  if (list) {
    return list.items.filter((item) => !item.purchased)
  }
  return []
})

const list = computed(() => {
  return shoppingListsStore.getListById(listId)
})

const listName = ref(list.value ? list.value.name : '-')
watch(list, () => {
  if (list.value) listName.value = list.value.name
})
const listsByShops = computed(() => {
  return sortListByShops(openItems.value)
})

const purchasedItems = computed(() => {
  const list = shoppingListsStore.getListById(listId)
  return list ? list.items.filter((item) => item.purchased) : []
})

const authors = computed(() => {
  const list = shoppingListsStore.getListById(listId)
  return list ? list.authors : []
})

async function putBack(item: ShoppingListItem) {
  await shoppingListsStore.updateItem(listId, { ...item, purchased: false })
}
// Create a list of items grouped by shop names
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

async function updateListName() {
  await shoppingListsStore.updateListName(listId, listName.value)
}

async function deleteList() {
  if (confirm('Bist du sicher, dass du diese Einkaufsliste löschen möchtest?')) {
    await shoppingListsStore.deleteList(listId)
  }

  router.push('/lists')
}

// A local cache within the component for display names to prevent re-fetching/re-rendering issues
const authorDisplayNames = reactive<{ [uid: string]: string }>({})

// Function to fetch and store the display name
const getAuthorDisplayName = (uid: string) => {
  if (authorDisplayNames[uid]) {
    return authorDisplayNames[uid]
  } else {
    // Fetch the name and update the reactive cache
    authStore.getUserProfileByUid(uid).then((profile) => {
      if (profile && profile.displayName) {
        authorDisplayNames[uid] = profile.displayName
      } else {
        authorDisplayNames[uid] = `Unknown User (${uid.substring(0, 4)}...)` // Fallback
      }
    })
    return 'Loading...' // Return a temporary string while fetching
  }
}
</script>

<style scoped></style>
