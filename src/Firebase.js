import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDTUcMidzj6Gs--gZMH9D0hNbvQvPDPtSs",
    authDomain: "crud-react-9bc8f.firebaseapp.com",
    databaseURL: "https://crud-react-9bc8f.firebaseio.com",
    projectId: "crud-react-9bc8f",
    storageBucket: "crud-react-9bc8f.appspot.com",
    messagingSenderId: "274190848681",
    appId: "1:274190848681:web:b6f2582b69ea8d97984fb8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()

  export {auth, firebase}