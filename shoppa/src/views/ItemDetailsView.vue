<template>
  <div class="flex">
    <div
      class="fixed top-14 left-0 z-10 flex w-full items-center justify-between gap-2 bg-white px-4"
    >
      <button @click="router.push(`/lists/${listId}`)">
        <IconArrowRight class="h-8 w-8 rotate-180 cursor-pointer text-indigo-500" />
      </button>
      <h1 class="border-b-3 border-transparent bg-white py-2 text-xl text-indigo-700">
        {{ listName }}
      </h1>
      <div class="h-8 w-8"></div>
    </div>

    <div class="flex w-full flex-col justify-between gap-4">
      <div v-if="item">
        <ShoppingListItemDetailInput
          :category="categoryStore.getCategoryByName(newItemCategory)"
          v-model="itemName"
          :purchased
          @updateItem="updateItemName(item)"
          @purchase="purchase(item)"
          @put-back="putBack(item)"
        />

        <div class="flex flex-col gap-8 p-4">
          <div>
            <h2 class="text-lg text-indigo-500">Geschäft</h2>
            <PillSelect
              text-size="lg"
              :items="shopNames"
              v-model="newShopName"
              @change="updateShopName(item)"
            />
          </div>
          <div>
            <h2 class="text-lg text-indigo-500">Kategorie</h2>
            <PillSelect
              text-size="lg"
              :items="categoryNames"
              v-model="newItemCategory"
              :colors="categoryColors"
              @change="updateCategory(item)"
            />
          </div>
        </div>
      </div>
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
import { useShoppingListsStore } from '@/stores/shoppingListsStore'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import ShoppingListItemDetailInput from '@/components/ShoppingListItemDetailInput.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { computed, ref, watch } from 'vue'
import type { ShoppingListItem } from '@/types'
import ButtonTrash from '@/components/ButtonTrash.vue'
import PillSelect from '@/components/PillSelect.vue'
import { useShopStore } from '@/stores/shopStore'
import { useShopTypeStore } from '@/stores/shopTypeStore'

const router = useRouter()
const route = useRoute()
const listId = route.params.listId as string
const itemId = route.params.itemId as string

const shoppingListsStore = useShoppingListsStore()
const shopTypeStore = useShopTypeStore()
const listName = computed(() => {
  const list = shoppingListsStore.getListById(listId)
  return list ? list.name : '-'
})
const item = computed(() => {
  return shoppingListsStore.getItemById(listId, itemId)
})

const itemName = ref(item.value ? item.value.name : '')
watch(item, () => {
  if (item.value) itemName.value = item.value.name
})
const purchased = ref(item.value ? item.value.purchased : false)
const dateAdded = ref(
  item.value
    ? new Date(item.value.dateAdded).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : 'Unbekannt',
)

const newItemCategory = ref(item.value?.category || 'Sonstiges')
const newShopName = ref(item.value?.shopName || 'Supermarkt')

const categoryStore = useCategoryStore()
const shopStore = useShopStore()
const categoryNames = computed(() => {
  const shopType = shopStore.getTypeByShop(newShopName.value)
  if (shopType) return shopTypeStore.getCategoriesByType(shopType)
  else return []
})
const categoryColors = computed(() => {
  return categoryStore.categories
    .filter((category) => categoryNames.value!.includes(category.name)) // TODO: make secure
    .map((category) => category.color)
})

const shopNames = shopStore.shops.map((shop) => shop.name)

async function purchase(item: ShoppingListItem) {
  await shoppingListsStore.updateItem(listId, { ...item, purchased: true })
  purchased.value = true
}
async function putBack(item: ShoppingListItem) {
  await shoppingListsStore.updateItem(listId, { ...item, purchased: false })
  purchased.value = false
}
async function updateItemName(item: ShoppingListItem) {
  await shoppingListsStore.updateItem(listId, { ...item, name: itemName.value })
}
async function updateCategory(item: ShoppingListItem) {
  await shoppingListsStore.updateItem(listId, { ...item, category: newItemCategory.value })
}
async function updateShopName(item: ShoppingListItem) {
  await shoppingListsStore.updateItem(listId, { ...item, shopName: newShopName.value })
}
async function deleteItem() {
  if (confirm('Bist du sicher, dass du diesen Artikel löschen möchtest?')) {
    await shoppingListsStore.deleteItem(listId, itemId)
    router.push(`/lists/${listId}`)
  }
}
</script>

<style scoped></style>
