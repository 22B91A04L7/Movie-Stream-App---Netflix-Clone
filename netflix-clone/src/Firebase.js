import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDEebLFFu2eT-4r-bCh4d_DQe8-fQsVnOM",
  authDomain: "netflix-clone-ef2d5.firebaseapp.com",
  projectId: "netflix-clone-ef2d5",
  storageBucket: "netflix-clone-ef2d5.firebasestorage.app",
  messagingSenderId: "156933430731",
  appId: "1:156933430731:web:b669a99ecbf840ab7bea4e",
  measurementId: "G-G1D8NQ1715"
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
    udi: user.uid,
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
  console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  
}
}


//  User Log Out

const logout = () => {
  signOut(auth);
}


export {auth, db, login, signup, logout};
