import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyC_QC8B0gdfQCxYaJ2-jOyf4mqXAi1THr8",

  authDomain: "online-store-bea47.firebaseapp.com",

  databaseURL: "https://online-store-bea47-default-rtdb.firebaseio.com",

  projectId: "online-store-bea47",

  storageBucket: "online-store-bea47.appspot.com",

  // messagingSenderId: "865668136161",

  appId: "1:865668136161:web:f8a2c4bdc923fe9e304ba0",

  // measurementId: "G-ECGF1JBP18",
};

const app = initializeApp(config);
const db = getFirestore(app);
const authentication = getAuth(app);

export default db;
