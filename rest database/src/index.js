import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom'; // https://stackoverflow.com/a/71985764
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
// import {getDatabase} from "firebase/database"

// import * as serviceWorker from './serviceWorker';
const firebaseConfig = {
    apiKey: "AIzaSyBHZgwZ3XcwbYbseufMsi0jDB_vP9UJpzU",
    authDomain: "ssui-hw6-19451.firebaseapp.com",
    projectId: "ssui-hw6-19451",
    storageBucket: "ssui-hw6-19451.appspot.com",
    messagingSenderId: "539063569940",
    appId: "1:539063569940:web:47b74479c20f6c13f5a101",
    measurementId: "G-WJLQ6XG6C8"
  };

  // const database = getDatabase()

  
// const app = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore()
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App app={app}/>
);

// export default db;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
