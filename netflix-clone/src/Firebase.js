import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD4rzpM9rg-NhlM5Kn2WvEJF1h4oCI5f_s",
  authDomain: "moviestream-clone.firebaseapp.com",
  projectId: "moviestream-clone",
  storageBucket: "moviestream-clone.firebasestorage.app",
  messagingSenderId: "484138096705",
  appId: "1:484138096705:web:60fc5f8e3390be9c0f4ec0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// User SignUp
const signup = async (name,email, password) =>
{
  try {

    // creating Sign Up
   const res =  await createUserWithEmailAndPassword(auth, email, password);
   const user = res.user;
    //  Storing SignUp details in Firebase
   await addDoc(collection(db, "user"),{
    uid: user.uid,
    name,
    authProvider : "local",
    email,
   });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));;
    
  }
}


// User Login

const login = async (email, password) =>{
try {
   await signInWithEmailAndPassword(auth, email, password);
} catch (error) {
  // console.log(error);
  if(error === "auth/invalid-credential"){
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
    else{
       toast.error("User Not Registered");
    }
  
}
}


//  User Log Out

const logout = () => {
  signOut(auth);
}


export {auth, db, login, signup, logout};
