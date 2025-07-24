export interface ShoppingListItem {
  id: string
  name: string
  purchased: boolean
  dateAdded: string
  author: string
  category: string
  shopName?: string
}

export interface ShoppingList {
  id: string
  name: string
  authors: string[]
  items: ShoppingListItem[]
  dateCreated: string
  dateModified?: string
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
