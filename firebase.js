// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAZcB9rUnijM4PergDs061qLnrijR5ULtg",
    authDomain: "puc-launch.firebaseapp.com",
    projectId: "puc-launch",
    storageBucket: "puc-launch.appspot.com",
    messagingSenderId: "737617009042",
    appId: "1:737617009042:web:b3d381e84472fdd455094b",
    measurementId: "G-93B9CYRNSW"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, onAuthStateChanged };
