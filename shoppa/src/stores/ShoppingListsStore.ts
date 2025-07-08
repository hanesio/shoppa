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
  deleteDoc,
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

    async updateListName(listId: string, newListName: string) {
      this.isLoading = true
      this.error = null
      try {
        const listRef = doc(db, 'shoppingLists', listId) // Get reference to the specific list document

        // Find the current list in our store's state
        const currentList = this.lists.find((list) => list.id === listId)
        if (!currentList) {
          throw new Error(`Shopping list with ID ${listId} not found in local store.`)
        }

        await updateDoc(listRef, {
          name: newListName,
          dateModified: new Date().toISOString(),
        })

        this.isLoading = false
        console.log(`List "${listId}"'s name changed to "${newListName}".`)
      } catch (err: any) {
        this.error = err.message
      }
    },

    async deleteList(listId: string) {
      this.isLoading = true
      this.error = null
      try {
        const listRef = doc(db, 'shoppingLists', listId) // Get reference to the specific list document
        await deleteDoc(listRef) // Delete the document!

        this.isLoading = false
        console.log(`Shopping list with ID ${listId} deleted successfully.`)
        // No need to manually remove from this.shoppingLists; onSnapshot will handle it.
      } catch (err: any) {
        this.error = err.message
        this.isLoading = false
        console.error('Error deleting shopping list:', err)
      }
    },

    /**
     * Updates an existing item within the 'items' array of a specific shopping list document.
     * @param listId The ID of the shopping list document.
     * @param updatedItem The complete updated item object (must include its itemId).
     */
    async updateItem(listId: string, updatedItem: ShoppingListItem) {
      this.isLoading = true
      this.error = null
      try {
        const listRef = doc(db, 'shoppingLists', listId) // Get reference to the specific list document

        // Find the current list in our store's state
        const currentList = this.lists.find((list) => list.id === listId)
        if (!currentList) {
          throw new Error(`Shopping list with ID ${listId} not found in local store.`)
        }

        // Create a new array where the matching item is replaced with the updated one
        const newItemsArray = currentList.items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item,
        )

        await updateDoc(listRef, {
          items: newItemsArray, // Update the entire 'items' array field
          dateModified: new Date().toISOString(),
        })

        this.isLoading = false
        console.log(`Item "${updatedItem.name}" updated in list "${listId}".`)
      } catch (err: any) {
        this.error = err.message
      }
    },

    async deleteItem(listId: string, itemId: string) {
      this.isLoading = true
      this.error = null
      try {
        const listRef = doc(db, 'shoppingLists', listId) // Get reference to the specific list document

        // Find the current list in our store's state
        const currentList = this.lists.find((list) => list.id === listId)
        if (!currentList) {
          throw new Error(`Shopping list with ID ${listId} not found in local store.`)
        }

        // Create a new array where the matching item is replaced with the updated one
        const newItemsArray = currentList.items.filter((item) => item.id != itemId)

        await updateDoc(listRef, {
          items: newItemsArray, // Update the entire 'items' array field
          dateModified: new Date().toISOString(),
        })

        this.isLoading = false
        console.log('Item deleted')
      } catch (err: any) {
        this.error = err.message
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
