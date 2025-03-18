import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBqSf0BDS3rCfFIOysqEInZRMPgJlH2os",
  authDomain: "trashtalker-b12d9.firebaseapp.com",
  projectId: "trashtalker-b12d9",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export async function login() {
  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log(user);
    return user;
  }).catch(console.error);
}

export async function logout() {
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}