importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDOZ-eG9CM8qmxozxdBHLmuW-h_T7qmvB0",
  authDomain: "wayclear-3601a.firebaseapp.com",
  projectId: "wayclear-3601a",
  storageBucket: "wayclear-3601a.firebasestorage.app",
  messagingSenderId: "135083003251",
  appId: "1:135083003251:web:60b0fcd893a13e98bfc906",
});

const messaging = firebase.messaging();