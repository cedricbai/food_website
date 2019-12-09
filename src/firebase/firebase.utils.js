import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBgr86s-GPT02A0jTivL2yJxBUTOiyugOU",
    authDomain: "food-website-90647.firebaseapp.com",
    databaseURL: "https://food-website-90647.firebaseio.com",
    projectId: "food-website-90647",
    storageBucket: "food-website-90647.appspot.com",
    messagingSenderId: "542937383264",
    appId: "1:542937383264:web:3a52208a9ec3b081761e05",
    measurementId: "G-ZTBG4GZ9HF"
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