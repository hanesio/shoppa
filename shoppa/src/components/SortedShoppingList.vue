<template>
  <div class="w-full" v-for="list in powerlist" :key="list.shopName">
    <div class="flex items-center gap-2">
      <p class="text-indigo-500">{{ list.shopName }}</p>
      <div class="h-0.5 w-full rounded-full bg-gray-200"></div>
    </div>
    <div v-for="itemlist in list.categories">
      <ul class="flex flex-col gap-0.5">
        <p>{{ itemlist.category }}</p>
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
import { type ShoppingListItem } from '@/types'
import { computed } from 'vue'

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
  return formatByShopAndCategory(props.sortedLists)
})

console.log(powerlist.value)

async function purchase(item: ShoppingListItem) {
  await shoppingListsStore.updateItem(props.listId, { ...item, purchased: true })
  emit('purchase')
}

/**
 * Formatiert die Listen so, dass sie zuerst nach Geschäften und dann innerhalb jedes Geschäfts nach Kategorien gruppiert sind.
 * @param {SortedList[]} sortedLists - Das ursprüngliche Array der nach Geschäften sortierten Listen.
 * @returns {ShopCategorizedList[]} Ein Array von Objekten, die Geschäfte repräsentieren,
 * wobei jedes Geschäft ein Array von Kategorien enthält und jede Kategorie ein Array von Artikeln.
 */
function formatByShopAndCategory(sortedLists) {
  /** @type {ShopCategorizedList[]} */
  const result = []

  sortedLists.forEach((shopList) => {
    /** @type {Object.<string, ShoppingListItem[]>} */
    const categoriesMap = {} // Temporäre Map zum Gruppieren der Artikel dieses Shops nach Kategorie

    shopList.items.forEach((item) => {
      const category = item.category

      if (!categoriesMap[category]) {
        categoriesMap[category] = []
      }
      categoriesMap[category].push(item)
    })

    // Wandle die temporäre Map in das gewünschte Array-Format um
    const categoriesArray = Object.keys(categoriesMap).map((categoryName) => ({
      category: categoryName,
      items: categoriesMap[categoryName],
    }))

    // Füge das Geschäft mit seinen kategorisierten Artikeln zum Endergebnis hinzu
    result.push({
      shopName: shopList.shopName,
      categories: categoriesArray,
    })
  })

  return result
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
