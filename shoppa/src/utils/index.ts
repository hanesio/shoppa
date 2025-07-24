import type { CategoryGroup, ShopCategorizedList, ShopListInput, ShoppingListItem } from '@/types'

interface ColorObject {
  text: string
  bg: string
  border: string
  hover: string
}

export function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // Fallback: simple UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
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
