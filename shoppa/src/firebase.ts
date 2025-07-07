import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore' // For Firestore
import { getAuth } from 'firebase/auth' // For Authentication

const firebaseConfig = {
  apiKey: 'AIzaSyCEw6qeNl81ctBIn3V_tvxZzis_U5JUmoQ',

  authDomain: 'shoppa-d863f.firebaseapp.com',

  databaseURL: 'https://shoppa-d863f-default-rtdb.europe-west1.firebasedatabase.app',

  projectId: 'shoppa-d863f',

  storageBucket: 'shoppa-d863f.firebasestorage.app',

  messagingSenderId: '265079795549',

  appId: '1:265079795549:web:bc78af6d5017f0869b82b4',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize services
export const db = getFirestore(app)
export const auth = getAuth(app)
