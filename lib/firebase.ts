// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getMessaging as _getMessaging, getToken, onMessage, Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBa1s6SAZ_q-yC8v7DWhWyZ8p_vMQMfkDE",
  authDomain: "taxihub-43fb1.firebaseapp.com",
  projectId: "taxihub-43fb1",
  storageBucket: "taxihub-43fb1.firebasestorage.app",
  messagingSenderId: "331733728926",
  appId: "1:331733728926:web:22c158684f3816dd89458f",
  measurementId: "G-2RX5RYZBET"
};

let messaging: Messaging | null = null;

export function getFirebaseMessaging() {
  if (typeof window === "undefined") return null;

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  if (!messaging) {
    messaging = _getMessaging();
  }

  return messaging;
}

export { getToken, onMessage };
