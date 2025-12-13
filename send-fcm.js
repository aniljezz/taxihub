// send-fcm.js
const admin = require("firebase-admin");
const fs = require("fs");

// service account JSON read karo
const serviceAccount = JSON.parse(
  fs.readFileSync("./service-account.json", "utf8")
);

// Admin SDK init
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Yahan apna browser se copy kiya hua FCM token paste karo
const targetToken = "du3u65HSZqXC0Bo49yRva0:APA91bFFSfnpXTgFVVNr-qYsu87FwZjJZWs4dJQsqfMHMEO7j1YIG3PX8lK0MnLEi1ETzXCzIjBq8jSyTJJZnV19bnNpHcGww6AJT8HUVs7j1sscS5BUls0";

async function sendPush() {
  try {
    const message = {
      token: targetToken,
      notification: {
        title: "Taxihub update",
        body: "New message from Taxihub",
      },
      webpush: {
        notification: {
          icon: "/icons/icon-192.png",
        },
      },
    };

    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending push:", error);
  }
}

sendPush();
