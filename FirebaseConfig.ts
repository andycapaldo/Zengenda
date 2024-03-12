import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhxxHQ5d7enqn78RvCcsAxK_kLJEbRnNI",
  authDomain: "productivity-app-cad8c.firebaseapp.com",
  projectId: "productivity-app-cad8c",
  storageBucket: "productivity-app-cad8c.appspot.com",
  messagingSenderId: "260680147609",
  appId: "1:260680147609:web:3ae7e13d095c9f50a08e08"
};


// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
