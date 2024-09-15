import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFczfF3g9BUIdHv5xjMPuL2lqGKcRUzYU",
  authDomain: "workout-app-f1575.firebaseapp.com",
  projectId: "workout-app-f1575",
  storageBucket: "workout-app-f1575.appspot.com",
  messagingSenderId: "653909816944",
  appId: "1:653909816944:web:c51f04c309ed5f265566b5",
  measurementId: "G-NYV7PVKW2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to save basket items to Firestore
const saveBasketItems = async (basketItems: any[], userId: string) => {
  try {
    const basketRef = collection(db, "users", userId, "basket");
    for (const item of basketItems) {
      await addDoc(basketRef, item);
    }
    console.log("Basket items saved successfully.");
  } catch (error) {
    console.error("Error saving basket items: ", error);
  }
};

export { app, analytics, auth, db, saveBasketItems };
