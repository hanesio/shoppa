<template>
  <div v-for="list in sortedLists" :key="list.shopName">
    <div class="flex items-center gap-2">
      <p class="text-indigo-500">{{ list.shopName }}</p>
      <div class="h-0.5 w-full bg-gray-200"></div>
    </div>

    <ul class="flex flex-col gap-0.5">
      <li v-for="item in list.items" :key="item.id">
        <ShoppingListItemEntry
          @click="purchase(item)"
          :name="item.name"
          :category="item.category"
        />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import ShoppingListItemEntry from './ShoppingListItemEntry.vue'
import { type ShoppingListItem } from '@/types'

const props = defineProps<{
  sortedLists: { shopName: string; items: ShoppingListItem[] }[]
}>()

const emit = defineEmits<{
  (e: 'purchase'): void
}>()

function purchase(item: ShoppingListItem) {
  item.purchased = true
  emit('purchase')
}
</script>
