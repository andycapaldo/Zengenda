import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcKmyy2msu0WrLnw1N5OASRHaEJfKO3Kk",
  authDomain: "zengenda-b49fb.firebaseapp.com",
  projectId: "zengenda-b49fb",
  storageBucket: "zengenda-b49fb.appspot.com",
  messagingSenderId: "174608411722",
  appId: "1:174608411722:web:3e1e76d6f12f379a208ab3"
};



export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export { getAuth }

