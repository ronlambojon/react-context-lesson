import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCTDnl32C_nWnpofbjDfSzT-3h0g_0dnSI",
  authDomain: "crwn-db-53f0d.firebaseapp.com",
  databaseURL: "https://crwn-db-53f0d.firebaseio.com",
  projectId: "crwn-db-53f0d",
  storageBucket: "crwn-db-53f0d.appspot.com",
  messagingSenderId: "929261080997",
  appId: "1:929261080997:web:61c3c790759bb9402a184c",
  measurementId: "G-DEYRE9EXZC"
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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
