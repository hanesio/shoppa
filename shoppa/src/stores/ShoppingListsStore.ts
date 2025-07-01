import { defineStore } from 'pinia'
import { type ShoppingList } from '@/types'

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
  actions: {},
  getters: {
    getListById: (state) => {
      return (listId: string) => state.lists.find((list) => list.id === listId)
    },
  },
})
