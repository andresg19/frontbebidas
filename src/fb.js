import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
export const app = firebase.initializeApp({
  projectId: "fb-auth-bebidas",
  appId: "1:274916853412:web:63625ecc6bc38c5b55c831",
  storageBucket: "fb-auth-bebidas.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyCoxyUObkfQgwnn9nssV3hpp3JIEcO4reQ",
  authDomain: "fb-auth-bebidas.firebaseapp.com",
  messagingSenderId: "274916853412",
});
export const auth = getAuth(app);
export const currentUser = auth.currentUser;
export const googleProvider = new GoogleAuthProvider();