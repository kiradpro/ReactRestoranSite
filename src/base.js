import reBase from "re-base";
import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAjM99iBg_gzDVQyZrK8uAngN83t5nwVGM",
    authDomain: "tony-s-pizza-f6713.firebaseapp.com",
    databaseURL: "https://tony-s-pizza-f6713-default-rtdb.europe-west1.firebasedatabase.app"
    
});

const base = reBase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;