import firebase from 'firebase'
import "firebase/auth"

const config = {
  apiKey: "AIzaSyDrDpPhNFoYrA1tAaPesTmbt6Wlfcx586Q",
  authDomain: "nutri-planner-59855.firebaseapp.com",
  projectId: "nutri-planner-59855",
  storageBucket: "nutri-planner-59855.appspot.com",
  messagingSenderId: "291663450863",
  appId: "1:291663450863:web:8400bfdf4a9c959848411a",
  measurementId: "G-QD3L45971E",
  databaseURL: "https://nutri-planner-59855-default-rtdb.firebaseio.com/",
}


// Get a reference to the database service
export default !firebase.apps.length ? firebase.initializeApp(config).database() : firebase.app().database();