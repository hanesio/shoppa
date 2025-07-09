import { defineStore } from 'pinia'
import { auth, googleProvider, db } from '../firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { useShoppingListsStore } from '@/stores/shoppingListsStore'

interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null as UserProfile | null,
    authLoading: true,
    authError: null as string | null,
    _userProfileCache: {} as { [uid: string]: UserProfile },
  }),

  actions: {
    /**
     * Authenticates a Firebase client using a popup-based OAuth authentication flow and creates a user profile Firestores's 'users' collection
     */
    async signInWithGoogle() {
      this.authLoading = true
      this.authError = null
      try {
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user // The Firebase User object

        // Optional: Store user data in Firestore's 'users' collection
        if (user) {
          const userRef = doc(db, 'users', user.uid)
          const userSnap = await getDoc(userRef)

          if (!userSnap.exists()) {
            // New user, create their profile in Firestore
            await setDoc(userRef, {
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              createdAt: new Date().toISOString(),
            })
            console.log('New user profile created in Firestore.')
          }
        }

        console.log('Signed in successfully!', user.displayName)
      } catch (error: any) {
        this.authError = error.message
        console.error('Error signing in with Google:', error)
      } finally {
        this.authLoading = false
      }
    },
    /**
     * Signs out the current user.
     **/
    async signOutUser() {
      this.authLoading = true
      this.authError = null
      try {
        await signOut(auth)
        this.currentUser = null
        console.log('User signed out.')
      } catch (error: any) {
        this.authError = error.message
        console.error('Error signing out:', error)
      } finally {
        this.authLoading = false
      }
    },
    /**
     * Listens for auth state changes (important for maintaining login status and synchronizing listening for shopping lists).
     */
    initAuthListener() {
      onAuthStateChanged(auth, (user) => {
        const shoppingListsStore = useShoppingListsStore()
        if (user) {
          // User is signed in
          this.currentUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }
          console.log('Auth state changed: User is logged in.')
          shoppingListsStore.startListeningToShoppingLists()
        } else {
          // User is signed out
          this.currentUser = null
          console.log('Auth state changed: User is logged out.')
          shoppingListsStore.stopListeningToShoppingLists()
        }
        this.authLoading = false // Auth state is determined, no longer loading
      })
    },

    /**
     * Retrieves a user's profile (including displayName/username) by their email.
     * @param email Email of the user to be retrieved.
     */
    async findUserUidByEmail(email: string): Promise<string | null> {
      try {
        const usersColRef = collection(db, 'users')
        // Create a query to find a user document where the email field matches
        const q = query(usersColRef, where('email', '==', email.toLowerCase())) // Use toLowerCase for consistent matching

        const querySnapshot = await getDocs(q) // getDocs to fetch documents once

        if (!querySnapshot.empty) {
          // Assuming email is unique, we just take the first result
          const userDoc = querySnapshot.docs[0]
          console.log(`Found user ${email} with UID: ${userDoc.id}`)
          return userDoc.id // The document ID is the UID
        } else {
          console.log(`No user found with email: ${email}`)
          return null
        }
      } catch (error: any) {
        console.error('Error finding user by email:', error)
        return null
      }
    },

    /**
     * Retrieves a user's profile (including displayName/username) by their UID.
     * Uses a cache to avoid unnecessary Firestore reads.
     * @param uid UID to get the user documents reference
     */
    async getUserProfileByUid(uid: string): Promise<UserProfile | null> {
      // 1. Check the cache first
      if (this._userProfileCache[uid]) {
        return this._userProfileCache[uid]
      }

      // 2. If not in cache, fetch from Firestore
      try {
        const userDocRef = doc(db, 'users', uid) // Reference to the specific user document
        const userDocSnap = await getDoc(userDocRef) // Fetch the document
        if (userDocSnap.exists()) {
          const profileData = userDocSnap.data() as Omit<UserProfile, 'uid'> // Cast data
          const userProfile: UserProfile = { uid: userDocSnap.id, ...profileData }
          this._userProfileCache[uid] = userProfile // Cache the result
          return userProfile
        } else {
          console.warn(`User profile for UID ${uid} not found.`)
          return null
        }
      } catch (error: any) {
        console.error(`Error fetching user profile for UID ${uid}:`, error)
        return null
      }
    },
  },
})
