/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
// @ts-expect-error
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBWeZcG1wAfFFruaQCyFwcJEkMWy5ByOy8",
  authDomain: "svindicium-website.firebaseapp.com",
  databaseURL:
    "https://svindicium-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "svindicium-website",
  storageBucket: "svindicium-website.appspot.com",
  messagingSenderId: "18534773268",
  appId: "1:18534773268:web:3053881d8692975079ad01",
  measurementId: "G-6QNCHL85CH",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);
const auth = getAuth(firebaseapp);

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
console.log(auth.currentUser);
