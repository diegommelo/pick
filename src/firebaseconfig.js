import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDEh-Ntp0xJhdQNGeEN2pmFt8q2DhzOpBI",
  authDomain: "pick-d6089.firebaseapp.com",
  databaseURL: "https://pick-d6089.firebaseio.com",
  projectId: "pick-d6089",
  storageBucket: "pick-d6089.appspot.com",
  messagingSenderId: "1013394410761"
}

const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }

export const db = firebase.initializeApp(config).firestore();