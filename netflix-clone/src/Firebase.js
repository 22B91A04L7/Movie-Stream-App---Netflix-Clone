import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAqeIlGBMn1gK-IZbb4H2f9294vgM8yPPo",
  authDomain: "movie-stream-clone-49325.firebaseapp.com",
  projectId: "movie-stream-clone-49325",
  storageBucket: "movie-stream-clone-49325.firebasestorage.app",
  messagingSenderId: "447951059219",
  appId: "1:447951059219:web:a92cad484521b187b842e6"
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
