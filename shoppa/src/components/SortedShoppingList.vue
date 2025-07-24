<template>
  <div class="flex w-full flex-col gap-2" v-for="list in powerlist" :key="list.shopName">
    <div class="flex items-center gap-2">
      <p class="text-indigo-500">{{ list.shopName }}</p>
      <div class="h-0.5 w-full rounded-full bg-gray-200"></div>
    </div>
    <div v-for="itemlist in list.categories">
      <ul class="relative flex flex-col gap-0.5">
        <p
          class="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-2 py-0.5 text-center text-xs text-gray-500"
        >
          {{ itemlist.category }}
        </p>
        <li v-for="(item, index) in itemlist.items" :key="item.id">
          <ShoppingListItemEntry
            class="cascade"
            :style="`animation-delay:${0.1 * index}s`"
            @purchase="purchase(item)"
            @showDetails="emit('showDetails', item)"
            :name="item.name"
            :category="categoryStore.getCategoryByName(item.category)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore'
import { useShoppingListsStore } from '@/stores/shoppingListsStore'
import ShoppingListItemEntry from './ShoppingListItemEntry.vue'
import {
  type CategoryGroup,
  type ShopCategorizedList,
  type ShopListInput,
  type ShoppingListItem,
} from '@/types'
import { computed } from 'vue'
import { formatByShopAndCategory } from '@/utils'

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

const powerlist = computed(() => {
  console.log(formatByShopAndCategory(props.sortedLists))
  return formatByShopAndCategory(props.sortedLists)
})

console.log(powerlist.value)

async function purchase(item: ShoppingListItem) {
  await shoppingListsStore.updateItem(props.listId, { ...item, purchased: true })
  emit('purchase')
}
</script>

<style scoped>
.cascade {
  opacity: 0;
  transform: translateY(20px);
  animation: cascadeIn 0.3s ease-out forwards;
}

.slice {
  animation: sliceOut 0.3s ease-in;
}
@keyframes cascadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes sliceOut {
  0% {
    opacity: 1;
    transform: scale(1, 1);
  }
  100% {
    opacity: 0;
    transform: scale(1, 0);
  }
}

.fade-list-enter-active,
.fade-list-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}
.fade-list-enter-to,
.fade-list-leave-from {
  opacity: 1;
  transform: scaleY(1);
}
</style>
