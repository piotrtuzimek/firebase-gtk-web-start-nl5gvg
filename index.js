// Import stylesheets
import './style.css';
import { initializeApp } from 'firebase/app';
import { doc, onSnapshot } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  getAuth,
  EmailAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {} from 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');
const tbmessagelist = document.getElementById('tbmessagelist');

let rsvpListener = null;
let guestbookListener = null;

let db, auth;

async function fillTable() {
  const q = query(collection(db, 'speed', 'messages', 'items'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let myTable = document
      .getElementById('myTable')
      .getElementsByTagName('tbody')[0];

    let row = myTable.insertRow();
    let cell2 = (row.insertCell(0).innerHTML = doc.data().text);
  });
}

async function main() {
  // Add Firebase project configuration object here

  const firebaseConfig = {
    apiKey: 'AIzaSyCYQkahvOPKErzsHomhCaQYTMMDxwsOPLA',
    authDomain: 'panel-d1100.firebaseapp.com',
    projectId: 'panel-d1100',
    storageBucket: 'panel-d1100.appspot.com',
    messagingSenderId: '346832127755',
    appId: '1:346832127755:web:ba1476a2288051cc31040e',
    measurementId: 'G-HJ64ZJRNHQ',
  };
  try {
    const app = initializeApp(firebaseConfig);

    auth = getAuth();
    db = getFirestore();
    fillTable();
  } catch (e) {
    console.log('error:', e);
  }

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      },
    },
  };
}
main();
