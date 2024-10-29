// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword ,
    signOut 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; // Import storage

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
const db = getFirestore(app);
const storage = getStorage(app); // Initialize storage

export { auth, onAuthStateChanged, db, signInWithEmailAndPassword, storage, signOut };
