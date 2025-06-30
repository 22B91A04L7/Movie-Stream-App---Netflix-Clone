import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore, deleteDoc} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAY-ZgaC9AvoqdLkQUxE_z-MeqlLdyXQc0",
  authDomain: "moviestream-clone-50f6f.firebaseapp.com",
  projectId: "moviestream-clone-50f6f",
  storageBucket: "moviestream-clone-50f6f.firebasestorage.app",
  messagingSenderId: "950048620504",
  appId: "1:950048620504:web:3f3d07e6797fa5dc0bbcad"
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
