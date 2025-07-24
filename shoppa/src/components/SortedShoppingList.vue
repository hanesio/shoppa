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
  console.log(formatByShopAndCategory(props.sortedLists))
  return formatByShopAndCategory(props.sortedLists)
})

console.log(powerlist.value)

async function purchase(item: ShoppingListItem) {
  await shoppingListsStore.updateItem(props.listId, { ...item, purchased: true })
  emit('purchase')
}

/**
 * @interface ShopListInput
 * Definiert die Struktur des Eingabe-Arrays für jedes Geschäft.
 */
export interface ShopListInput {
  shopName: string
  items: ShoppingListItem[]
}

/**
 * @interface CategoryGroup
 * Definiert die Struktur einer Gruppe von Artikeln unter einer bestimmten Kategorie.
 */
export interface CategoryGroup {
  category: string
  items: ShoppingListItem[]
}

/**
 * @interface ShopCategorizedList
 * Definiert die finale Ausgabestruktur: ein Geschäft mit seinen nach Kategorien gruppierten Artikeln.
 */
export interface ShopCategorizedList {
  shopName: string
  categories: CategoryGroup[]
}

/**
 * Formatiert eine Liste von nach Geschäften sortierten Artikeln
 * so, dass sie zuerst nach Geschäften und dann innerhalb jedes Geschäfts nach Kategorien gruppiert sind.
 *
 * @param sortedLists - Das ursprüngliche Array der nach Geschäften sortierten Listen.
 * @returns Ein Array von Objekten, die Geschäfte repräsentieren,
 * wobei jedes Geschäft ein Array von Kategorien enthält und jede Kategorie ein Array von Artikeln.
 */
export function formatByShopAndCategory(sortedLists: ShopListInput[]): ShopCategorizedList[] {
  const result: ShopCategorizedList[] = []

  sortedLists.forEach((shopList) => {
    // Verwende eine Map, um Artikel nach Kategorie zu gruppieren.
    // Maps sind typsicherer und performanter, wenn Schlüssel Nicht-Strings sein könnten
    // oder wenn die Reihenfolge der Schlüssel wichtig ist (was hier nicht der Fall ist, aber generell gut zu wissen).
    const categoriesMap = new Map<string, ShoppingListItem[]>()

    shopList.items.forEach((item) => {
      const category = item.category

      // Wenn die Kategorie noch nicht in der Map existiert, initialisiere ein leeres Array dafür.
      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, [])
      }
      // Füge das aktuelle Element dem entsprechenden Kategorie-Array hinzu.
      categoriesMap.get(category)?.push(item) // Das '?' ist hier sicher, da wir gerade geprüft haben, dass der Schlüssel existiert.
    })

    // Wandle die temporäre Map in das gewünschte Array-Format (CategoryGroup[]) um.
    const categoriesArray: CategoryGroup[] = Array.from(categoriesMap.entries()).map(
      ([categoryName, items]) => ({
        category: categoryName,
        items: items,
      }),
    )

    // Füge das Geschäft mit seinen kategorisierten Artikeln zum Endergebnis hinzu.
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
