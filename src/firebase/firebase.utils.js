import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyArcqtFIEBygYZXPEhri9uH_bT-lPEGowg",
  authDomain: "ecommerce-f660c.firebaseapp.com",
  databaseURL: "https://ecommerce-f660c.firebaseio.com",
  projectId: "ecommerce-f660c",
  storageBucket: "ecommerce-f660c.appspot.com",
  messagingSenderId: "930313478783",
  appId: "1:930313478783:web:cd2cc2fd6e138f86e6d54a",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
