<template>
  <div
    @click="showList"
    class="relative flex cursor-pointer flex-col justify-between gap-1 rounded-md bg-gray-100 px-4 py-2 text-lg hover:bg-indigo-400"
  >
    <p
      class="absolute top-1/2 right-0 translate-x-0.5 -translate-y-1/2 rounded-l-2xl rounded-r-sm bg-indigo-200 px-2 py-1 text-sm"
    >
      <span class="text-indigo-600">{{ openItemsCount }}</span
      >/{{ items.length }}
    </p>

    <p class="h-8 truncate overflow-hidden">{{ name }}</p>

    <div class="h-24 overflow-hidden px-2">
      <ul>
        <li
          v-for="item in itemsToBuy.slice(0, 4)"
          :key="item.id"
          class="flex items-center gap-1 text-sm text-gray-600"
        >
          <div class="h-2 w-2 shrink-0 rounded-full border border-gray-600"></div>
          <span class="truncate">{{ item.name }}</span>
        </li>
        <li v-if="itemsToBuy.length > 4" class="text-xs text-gray-500">
          {{ itemsToBuy.length - 4 }} weitere
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShoppingList, ShoppingListItem } from '@/types'

const props = defineProps<{
  name: string
  items: ShoppingListItem[]
}>()

const emit = defineEmits<{
  (e: 'showList'): void
}>()

const itemsToBuy = props.items.filter((item) => !item.purchased)
const openItemsCount = itemsToBuy.length
function showList() {
  emit('showList')
}
</script>
<style scoped></style>
