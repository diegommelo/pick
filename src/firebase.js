import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDEh-Ntp0xJhdQNGeEN2pmFt8q2DhzOpBI",
  authDomain: "pick-d6089.firebaseapp.com",
  databaseURL: "https://pick-d6089.firebaseio.com",
  projectId: "pick-d6089",
  storageBucket: "pick-d6089.appspot.com",
  messagingSenderId: "1013394410761"
});

export const db = firebaseApp.firestore();