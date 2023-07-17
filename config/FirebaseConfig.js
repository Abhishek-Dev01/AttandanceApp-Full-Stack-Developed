import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_b9dsPWUo-LuGPVz-8qIf6fYsKriLVK8",
  authDomain: "attandancesrms.firebaseapp.com",
  projectId: "attandancesrms",
  storageBucket: "attandancesrms.appspot.com",
  messagingSenderId: "10647367565",
  appId: "1:10647367565:web:187dd22765bbe85b2897c4",
  measurementId: "G-SF9Q87QTSR"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
export default firebaseApp;
