import { defineStore } from 'pinia'
import { type ShoppingList, type ShoppingListItem } from '@/types'

interface ShoppingListsState {
  lists: ShoppingList[]
}

export const useShoppingListsStore = defineStore('lists', {
  state: (): ShoppingListsState => {
    return {
      lists: [
        {
          id: '1',
          name: 'Einkaufsliste',
          authors: ['Hannes'],
          items: [
            {
              id: '1',
              name: 'Apfel',
              purchased: false,
              dateAdded: '2023-10-01',
              author: 'Hannes',
              category: 'Obst & Gemüse',
              shopName: 'REWE',
              shopId: '1',
            },
            {
              id: '2',
              name: 'Netz Zwiebeln',
              purchased: false,
              dateAdded: '2023-10-01',
              author: 'Hannes',
              category: 'Obst & Gemüse',
              shopName: 'REWE',
              shopId: '1',
            },
            {
              id: '3',
              name: 'Wurstaufschnitt',
              purchased: false,
              dateAdded: '2023-10-01',
              author: 'Hannes',
              category: 'Fleisch & Wurst',
              shopName: 'REWE',
              shopId: '1',
            },
          ],
          dateCreated: '2023-10-01',
          dateModified: '2023-10-01',
        },
      ],
    }
  },
  actions: {
    addItemToList(listId: string, item: ShoppingListItem) {
      const list = this.lists.find((list) => list.id === listId)
      if (list) {
        list.items.push(item)
        list.dateModified = new Date().toISOString().split('T')[0] // Update the modified date
      }
    },
    addList(list: ShoppingList) {
      this.lists.push(list)
    },
    deleteList(listId: string) {
      this.lists = this.lists.filter((list) => list.id !== listId)
    },
    updateList(listId: string, updatedList: ShoppingList) {
      const index = this.lists.findIndex((list) => list.id === listId)
      if (index !== -1) {
        this.lists[index] = { ...this.lists[index], ...updatedList }
        this.lists[index].dateModified = new Date().toISOString().split('T')[0] // Update the modified date
      }
    },
    updateItem(listId: string, itemId: string, updatedItem: ShoppingListItem) {
      const list = this.lists.find((list) => list.id === listId)
      if (list) {
        const itemIndex = list.items.findIndex((item) => item.id === itemId)
        if (itemIndex !== -1) {
          //The item at itemIndex is updated with new values from updatedItem, while keeping unchanged properties intact.
          list.items[itemIndex] = { ...list.items[itemIndex], ...updatedItem }
          // Update the modified date of the list
          list.dateModified = new Date().toISOString().split('T')[0] // Update the modified date
        }
      }
    },
    updateItemName(listId: string, itemId: string, updatedName: string) {
      const list = this.lists.find((list) => list.id === listId)
      if (list) {
        const itemIndex = list.items.findIndex((item) => item.id === itemId)
        if (itemIndex !== -1) {
          list.items[itemIndex].name = updatedName
          // Update the modified date of the list
          list.dateModified = new Date().toISOString().split('T')[0] // Update the modified date
        }
      }
    },
    updateItemCategory(listId: string, itemId: string, updatedCategory: string) {
      const list = this.lists.find((list) => list.id === listId)
      if (list) {
        const itemIndex = list.items.findIndex((item) => item.id === itemId)
        if (itemIndex !== -1) {
          list.items[itemIndex].category = updatedCategory
          // Update the modified date of the list
          list.dateModified = new Date().toISOString().split('T')[0] // Update the modified date
        }
      }
    },
    updateItemShop(listId: string, itemId: string, updatedShopName: string) {
      const list = this.lists.find((list) => list.id === listId)
      if (list) {
        const itemIndex = list.items.findIndex((item) => item.id === itemId)
        if (itemIndex !== -1) {
          list.items[itemIndex].shopName = updatedShopName
          // Update the modified date of the list
          list.dateModified = new Date().toISOString().split('T')[0] // Update the modified date
        }
      }
    },
    deleteItem(listId: string, itemId: string) {
      const list = this.lists.find((list) => list.id === listId)
      if (list) {
        list.items = list.items.filter((item) => item.id !== itemId)
        list.dateModified = new Date().toISOString().split('T')[0] // Update the modified date
      }
    },
    purchaseItem(itemId: string) {
      for (const list of this.lists) {
        const item = list.items.find((item) => item.id === itemId)
        if (item) {
          item.purchased = true
          list.dateModified = new Date().toISOString().split('T')[0] // Update the modified date
          break
        }
      }
    },
  },
  getters: {
    getListById: (state) => {
      return (listId: string) => state.lists.find((list) => list.id === listId)
    },
    getItemById: (state) => {
      return (listId: string, itemId: string) => {
        const list = state.lists.find((list) => list.id === listId)
        return list ? list.items.find((item) => item.id === itemId) : undefined
      }
    },
  },
})
