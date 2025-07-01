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
    removeList(listId: string) {
      this.lists = this.lists.filter((list) => list.id !== listId)
    },
    updateList(listId: string, updatedList: ShoppingList) {
      const index = this.lists.findIndex((list) => list.id === listId)
      if (index !== -1) {
        this.lists[index] = { ...this.lists[index], ...updatedList }
        this.lists[index].dateModified = new Date().toISOString().split('T')[0] // Update the modified date
      }
    },
  },
  getters: {
    getListById: (state) => {
      return (listId: string) => state.lists.find((list) => list.id === listId)
    },
  },
})
