// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, writeBatch, doc, getDocs, query, CollectionReference } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBG3jnj64Mjhg71p3UJM2eXOLPULoRJY-I',
  authDomain: 'ai-angorythms.firebaseapp.com',
  projectId: 'ai-angorythms',
  storageBucket: 'ai-angorythms.appspot.com',
  messagingSenderId: '570991604636',
  appId: '1:570991604636:web:d4aacabcb4c50193ea4e59',
  measurementId: 'G-PQXV5MZJYT', // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (Optional)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and set up Google provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

// Function to save basket items to Firestore
const saveBasketItems = async (basketItems: any[], userId: string): Promise<void> => {
  try {
    const basketRef = collection(db, "users", userId, "basket") as CollectionReference;
    const batch = writeBatch(db);
    basketItems.forEach((item) => {
      const docRef = doc(basketRef); // Generate a new document reference
      batch.set(docRef, item);
    });
    await batch.commit();
    console.log("Basket items saved successfully.");
  } catch (error) {
    console.error("Error saving basket items: ", error);
  }
};

// Function to get basket items from Firestore
const getBasketItems = async (userId: string): Promise<any[]> => {
  try {
    const basketRef = collection(db, "users", userId, "basket");
    const basketQuery = query(basketRef);
    const querySnapshot = await getDocs(basketQuery);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error getting basket items: ", error);
    return [];
  }
};

// Export the necessary functions and variables
export { auth, googleProvider, analytics, signInWithPopup, saveBasketItems, getBasketItems };
