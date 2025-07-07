import { defineStore } from 'pinia'
import { type ShoppingList, type ShoppingListItem } from '@/types'
import { db, auth } from '../firebase' // Import your initialized Firebase services
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  addDoc,
} from 'firebase/firestore'
import { signOut } from 'firebase/auth' // Import specific auth methods as needed
import { v4 as uuidv4 } from 'uuid'

interface ShoppingListsState {
  lists: ShoppingList[]
  isLoading: boolean
  error: string | null
  currentUserEmail: string | null
}

export const useShoppingListsStore = defineStore('lists', {
  state: (): ShoppingListsState => ({
    lists: [],
    isLoading: false,
    error: null,
    currentUserEmail: null,
  }),

  actions: {
    // Action to listen for real-time list updates from Firestore
    async listenForLists() {
      this.isLoading = true
      this.error = null

      // const user = auth.currentUser
      // if (!user) {
      //   this.error = 'No user logged in to fetch lists for.'
      //   this.isLoading = false
      //   return
      // }

      const listsColRef = collection(db, 'shoppingLists') // Reference to your 'lists' collection

      // Set up a real-time listener
      onSnapshot(
        listsColRef,
        (snapshot) => {
          const listsData: any[] = []
          snapshot.forEach((doc) => {
            listsData.push({ id: doc.id, ...doc.data() })
          })

          this.lists = listsData
          this.isLoading = false
          console.log('Lists updated in store! ')
        },
        (err) => {
          this.error = err.message
          this.isLoading = false
          console.error('Error listening to lists:', err)
        },
      )
    },

    // Action to add a new list to Firestore
    async addList(newListData: Omit<ShoppingList, 'id' | 'dateModified'>) {
      this.isLoading = true
      this.error = null
      try {
        const listsColRef = collection(db, 'shoppingLists')
        const docRef = await addDoc(listsColRef, {
          ...newListData,
          dateCreated: new Date().toISOString(),
        })

        this.isLoading = false
        console.log('List added successfully!')
        return docRef.id
      } catch (err: any) {
        this.error = err.message
        this.isLoading = false
        console.error('Error adding list:', err)
      }
    },

    /**
     * Adds a new item to the 'items' array of a specific shopping list document.
     * @param listId The ID of the shopping list document.
     * @param newItemData The data for the new item (excluding itemId, which will be generated).
     */
    async addItemToList(listId: string, newItemData: Omit<ShoppingListItem, 'id'>) {
      this.isLoading = true
      this.error = null
      try {
        const listRef = doc(db, 'shoppingLists', listId) // Get reference to the specific list document
        const itemToAdd: ShoppingListItem = { ...newItemData, id: uuidv4() } // Add a unique ID
        // Option 1 (Recommended for nested objects): Read current list, modify items array, then update.
        // This ensures full control over array contents and is robust for complex item objects.
        const currentList = this.lists.find((list) => list.id === listId)
        if (!currentList) {
          throw new Error(`Shopping list with ID ${listId} not found in local store.`)
        }
        const updatedItemsArray = [...currentList.items, itemToAdd] // Create a new array with the new item
        console.log('try', listRef)
        await updateDoc(listRef, {
          items: updatedItemsArray, // Update the entire 'items' array field
          dateModified: new Date().toISOString(),
        })
        this.isLoading = false
        console.log(`Item "${itemToAdd.name}" added to list "${listId}".`)
      } catch (err: any) {
        this.error = err.message

        this.isLoading = false

        console.error('Error adding item to shopping list:', err)
      }
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

// [
//         {
//           id: '1',
//           name: 'Einkaufsliste',
//           authors: ['Hannes'],
//           items: [
//             {
//               id: '1',
//               name: 'Apfel',
//               purchased: false,
//               dateAdded: '2023-10-01',
//               author: 'Hannes',
//               category: 'Obst & Gemüse',
//               shopName: 'REWE',
//               shopId: '1',
//             },
//             {
//               id: '2',
//               name: 'Netz Zwiebeln',
//               purchased: false,
//               dateAdded: '2023-10-01',
//               author: 'Hannes',
//               category: 'Obst & Gemüse',
//               shopName: 'REWE',
//               shopId: '1',
//             },
//             {
//               id: '3',
//               name: 'Wurstaufschnitt',
//               purchased: false,
//               dateAdded: '2023-10-01',
//               author: 'Hannes',
//               category: 'Fleisch & Wurst',
//               shopName: 'REWE',
//               shopId: '1',
//             },
//           ],
//           dateCreated: '2023-10-01',
//           dateModified: '2023-10-01',
//         },
//       ],
