export interface ShoppingListItem {
  id: string
  name: string
  purchased: boolean
  dateAdded: string
  author: string
  category?: string
  shopName?: string
  shopId?: string
}

export interface ShoppingList {
  id: string
  name: string
  authors: string[]
  items: ShoppingListItem[]
  dateCreated: string
  dateModified?: string
}
