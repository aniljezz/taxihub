importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBa1s6SAZ_q-yC8v7DWhWyZ8p_vMQMfkDE",
  authDomain: "taxihub-43fb1.firebaseapp.com",
  projectId: "taxihub-43fb1",
  storageBucket: "taxihub-43fb1.firebasestorage.app",
  messagingSenderId: "331733728926",
  appId: "1:331733728926:web:22c158684f3816dd89458f",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification?.title || "Taxihub";
  const notificationOptions = {
    body: payload.notification?.body || "New update",
    icon: "/icons/icon-192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
