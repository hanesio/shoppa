<template>
  <div class="w-full" v-for="list in sortedLists" :key="list.shopName">
    <div class="flex items-center gap-2">
      <p class="text-indigo-500">{{ list.shopName }}</p>
      <div class="h-0.5 w-full rounded-full bg-gray-200"></div>
    </div>

    <ul class="flex flex-col gap-0.5">
      <li v-for="item in list.items" :key="item.id">
        <ShoppingListItemEntry
          @purchase="purchase(item)"
          @showDetails="emit('showDetails', item)"
          :name="item.name"
          :category="categoryStore.getCategoryByName(item.category)"
        />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore'
import { useShoppingListsStore } from '@/stores/shoppingListsStore'
import ShoppingListItemEntry from './ShoppingListItemEntry.vue'
import { type ShoppingListItem } from '@/types'

const props = defineProps<{
  listId: string
  sortedLists: { shopName: string; items: ShoppingListItem[] }[]
}>()

const emit = defineEmits<{
  (e: 'purchase'): void
  (e: 'showDetails', item: ShoppingListItem): void
}>()

const categoryStore = useCategoryStore()
const shoppingListsStore = useShoppingListsStore()

async function purchase(item: ShoppingListItem) {
  await shoppingListsStore.updateItem(props.listId, { ...item, purchased: true })
  emit('purchase')
}
</script>
