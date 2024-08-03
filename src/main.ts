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
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// https://firebase.google.com/docs/web/setup#available-libraries
import { VueFire, VueFireAuth } from 'vuefire';

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
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const functions = getFunctions(firebaseApp, "europe-west1");

if (process.env.NODE_ENV === "development") {
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  console.info(`
====[ Currently running in development mode ]====
Make sure \`ledenportaal-backend\` is also running!
Go to the folder and run \`npm run serve\`.
  `);
  console.warn(
    "Running in DEV mode, do not use production credentials. All emulator traffic is unencrypted!"
  );
}

const app = createApp(App);

registerPlugins(app);

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.mount("#app");

export { app, auth, analytics, functions };
