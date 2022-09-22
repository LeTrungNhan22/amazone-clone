import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBpXlu_WoVw_ceO7Lo949U66D6EVHvId_I",
  authDomain: "amz-clone-541e8.firebaseapp.com",
  projectId: "amz-clone-541e8",
  storageBucket: "amz-clone-541e8.appspot.com",
  messagingSenderId: "376141556212",
  appId: "1:376141556212:web:08c75d03b8f0cc3edb71a1",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
