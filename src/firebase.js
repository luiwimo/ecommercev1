import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBZrkvo61HRd2FW4drxihnt8EB8z4vwrc0",
    authDomain: "ecommerce-2022-fb518.firebaseapp.com",
    projectId: "ecommerce-2022-fb518",
    storageBucket: "ecommerce-2022-fb518.appspot.com",
    messagingSenderId: "992940704572",
    appId: "1:992940704572:web:c4110159e366d038c41439"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export {auth}