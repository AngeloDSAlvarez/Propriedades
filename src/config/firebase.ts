// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Substitua pelos seus valores reais do Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDUJpSOeLN_X1DgSea6pUV-0tXDrONfMQY",
  authDomain: "propriedades-88b47.firebaseapp.com",
  projectId: "propriedades-88b47",
  storageBucket: "propriedades-88b47.firebasestorage.app",
  messagingSenderId: "602207101515",
  appId: "1:602207101515:web:4b3abc916511d35926e3ce",
  measurementId: "G-MD7VHYKWN6",
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o módulo de Auth
const auth = getAuth(app);

export { app, auth };
