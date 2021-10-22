import * as firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFW9cs1vety41d0pZXAP5LpW0DbHYH3DM",
  authDomain: "hi-er-dev.firebaseapp.com",
  databaseURL: 'https://hi-er-dev.firebaseio.com',

  projectId: "hi-er-dev",
  storageBucket: "hi-er-dev.appspot.com",
  messagingSenderId: "904810437038",
  appId: "1:904810437038:web:6e7b83e5cc6e1ce159103f",
  measurementId: "G-WNPGDVFZPB"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyBJIXhxQriFH1KczQqi01A164qO6hqOAgI",
//     authDomain: "hier-a40dd.firebaseapp.com",
//     projectId: "hier-a40dd",
//     storageBucket: "hier-a40dd.appspot.com",
//     messagingSenderId: "493496496204",
//     appId: "1:493496496204:web:4c17ca2511b8bd8ca844e9"
//   };

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;