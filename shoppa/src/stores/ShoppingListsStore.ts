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
  arrayUnion,
} from 'firebase/firestore'
import type { Unsubscribe } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { useAuthStore } from './authStore'

interface ShoppingListsState {
  lists: ShoppingList[]
  isLoading: boolean
  error: string | null
  _firestoreUnsubscribe: Unsubscribe | null
}

export const useShoppingListsStore = defineStore('lists', {
  state: (): ShoppingListsState => ({
    lists: [],
    isLoading: false,
    error: null,
    _firestoreUnsubscribe: null as Unsubscribe | null,
  }),

  actions: {
    /**
     * Starts listening for shopping lists. Call this when a user logs in.
     */
    startListeningToShoppingLists() {
      if (this._firestoreUnsubscribe) {
        this._firestoreUnsubscribe()
        this._firestoreUnsubscribe = null
        console.log('Stopped previous Firestore listener for shoppingLists.')
      }
      this.isLoading = true
      this.error = null

      const authStore = useAuthStore()
      const currentUserUid = authStore.currentUser?.uid // Get the current user's UID

      // CRITICAL CHANGE HERE: Add a 'where' clause to filter the query
      if (!currentUserUid) {
        // If no user is logged in, or UID is null, we can't query for author-specific lists.
        // The security rules would deny this anyway.
        console.warn(
          'No current user UID found. Cannot start author-specific shopping lists listener.',
        )
        this.isLoading = false
        this.lists = [] // Clear any old data

        return // Exit the function as we cannot form a valid query
      }

      const listsColRef = collection(db, 'shoppingLists')
      // Create a query that only requests lists where the current user is an author
      const q = query(listsColRef, where('authors', 'array-contains', currentUserUid))

      // Use this filtered query for your onSnapshot listener
      this._firestoreUnsubscribe = onSnapshot(
        q,
        (snapshot) => {
          // Use 'q' here!
          console.log('onSnapshot triggered for shoppingLists!')
          const listsData: ShoppingList[] = []
          snapshot.forEach((doc) => {
            listsData.push({ id: doc.id, ...doc.data() } as ShoppingList)
          })
          this.lists = listsData
          this.isLoading = false
          console.log('Shopping lists updated in store! Count:', this.lists.length)
        },
        (err) => {
          // ... (your error handling, which is good for permission-denied messages) ...
          const authStore = useAuthStore()
          if (err.code === 'permission-denied' && !authStore.currentUser) {
            console.warn(
              'Permission denied for shopping lists because no user is logged in. This is expected behavior for protected data.',
            )
            this.lists = []
          } else {
            this.error = err.message
            console.error('Error listening to shopping lists:', err)
          }
          this.isLoading = false
        },
      )
      console.log('Started Firestore listener for shoppingLists with author filter.')
    },

    /**
     * Stops the shopping lists listener. Call this when a user logs out.
     */
    stopListeningToShoppingLists() {
      if (this._firestoreUnsubscribe) {
        this._firestoreUnsubscribe() // Call the unsubscribe function
        this._firestoreUnsubscribe = null
        this.lists = [] // Clear the lists when no longer listening
        console.log('Stopped Firestore listener and cleared shoppingLists.')
      }
    },

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
    async addList(listName: string) {
      this.isLoading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        if (!authStore.currentUser) {
          throw new Error('You must be logged in to create a list.')
        }

        const listsColRef = collection(db, 'shoppingLists')
        const docRef = await addDoc(listsColRef, {
          name: listName,
          authors: [authStore.currentUser.uid], // Creator is the first author
          items: [],
          dateCreated: new Date().toISOString(),
          dateModified: new Date().toISOString(),
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
     * Invites a user to collaborate on a shopping list by adding their UID to the 'authors' array.
     * @param listId The ID of the shopping list to invite to.
     * @param invitedUserUid The UID of the user to invite.
     */
    async inviteUserToShoppingList(listId: string, invitedUserUid: string) {
      this.isLoading = true
      this.error = null
      try {
        const listRef = doc(db, 'shoppingLists', listId) // Reference to the specific list document

        // This ensures the invitedUserUid is added only if it's not already present.
        await updateDoc(listRef, {
          authors: arrayUnion(invitedUserUid),
          dateModified: new Date().toISOString(),
        })

        this.isLoading = false
        console.log(`User ${invitedUserUid} successfully invited to list ${listId}.`)
      } catch (err: any) {
        this.error = err.message
        this.isLoading = false
        console.error('Error inviting user to shopping list:', err)
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
