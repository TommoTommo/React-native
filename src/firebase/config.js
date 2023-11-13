import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
 apiKey: "AIzaSyA9U9a00TG8FRNBmhHpsMrYAg9Z0dbI9Fk",
 authDomain: "proyecto-firebase-33720.firebaseapp.com",
 projectId: "proyecto-firebase-33720",
 storageBucket: "proyecto-firebase-33720.appspot.com",
 messagingSenderId: "354506554451",
 appId: "1:354506554451:web:0f520d79ac9b2aeeb95aa6"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
