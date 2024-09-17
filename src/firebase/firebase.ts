import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  fetchSignInMethodsForEmail 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  writeBatch, 
  doc, 
  getDocs, 
  query, 
  CollectionReference 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

interface BasketItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const saveBasketItems = async (basketItems: BasketItem[], userId: string): Promise<void> => {
  try {
    const basketRef = collection(db, "users", userId, "basket") as CollectionReference<BasketItem>;
    const batch = writeBatch(db);
    basketItems.forEach((item) => {
      const docRef = doc(basketRef, item.id);
      batch.set(docRef, item);
    });
    await batch.commit();
  } catch (error) {
    console.error("Error saving basket items: ", error);
  }
};

const getBasketItems = async (userId: string): Promise<BasketItem[]> => {
  try {
    const basketRef = collection(db, "users", userId, "basket") as CollectionReference<BasketItem>;
    const basketQuery = query(basketRef);
    const querySnapshot = await getDocs(basketQuery);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error getting basket items: ", error);
    return [];
  }
};

export { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  fetchSignInMethodsForEmail, 
  saveBasketItems, 
  getBasketItems 
};
