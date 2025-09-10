<template>
  <div
    @click="showList"
    class="relative flex cursor-pointer flex-col justify-between rounded-md bg-gradient-to-r from-orange-50 to-indigo-200 px-4 py-2 text-lg hover:scale-[1.02] hover:shadow-md active:scale-100 active:shadow-sm"
  >
    <div
      class="absolute inset-0 rounded-md bg-gradient-to-t from-orange-50 from-5% to-transparent to-30%"
    ></div>
    <p
      class="absolute top-1/2 right-0 flex translate-x-0.5 -translate-y-1/2 flex-col rounded-l-2xl rounded-r-sm bg-indigo-400 px-2 py-1 text-sm"
    >
      <span class="text-xl font-medium text-indigo-800">{{ openItemsCount }} </span>
    </p>

    <p class="h-8 truncate overflow-hidden text-xl font-semibold text-gray-800">{{ name }}</p>

    <div class="h-24 overflow-hidden px-2">
      <ul>
        <li
          v-for="item in itemsToBuy.slice(0, 5)"
          :key="item.id"
          class="flex items-center gap-1 text-sm text-gray-600"
        >
          <div class="h-2 w-2 shrink-0 rounded-full border border-gray-600"></div>
          <span class="truncate">{{ item.name }}</span>
        </li>
        <!-- <li v-if="itemsToBuy.length > 4" class="text-xs text-gray-500">
          {{ itemsToBuy.length - 4 }} weitere
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShoppingListItem } from '@/types'

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
