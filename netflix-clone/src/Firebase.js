import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAaSyt_uLiQGW7AAZYZAN31a4y_1H7H4_A",
  authDomain: "moviestream-b3aac.firebaseapp.com",
  projectId: "moviestream-b3aac",
  storageBucket: "moviestream-b3aac.firebasestorage.app",
  messagingSenderId: "12520904950",
  appId: "1:12520904950:web:0307308808df9edbc9b4d7",
  measurementId: "G-2QSY6S5XHR"
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
