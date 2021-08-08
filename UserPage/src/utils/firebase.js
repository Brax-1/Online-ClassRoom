import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCkotqgoUnPq69ZkJ6mLtYBm9G8f60WmhU",
    authDomain: "missioned-db4bd.firebaseapp.com",
    projectId: "missioned-db4bd",
    storageBucket: "missioned-db4bd.appspot.com",
    messagingSenderId: "935426434877",
    appId: "1:935426434877:web:65d1f70d1355f638afc754",
    measurementId: "G-WD155RRX0Y"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebase;