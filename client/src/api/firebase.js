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
  .then(async (result) => {
    const user = result.user;
    console.log(user);

    const [firstName, lastName] = user.displayName ? user.displayName.split(' ') : ['', ''];
    // Add user to database
    await fetch('http://localhost:5001/api/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: user.email,
      })
    });

    return user;
  }).catch(console.error);
}

export async function logout() {
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}