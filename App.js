import "react-native-gesture-handler";
import React, { useEffect } from "react";
import Navigator from "./routes/drawer";
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "./firebase";

export default function App() {
  return <Navigator />;
}
