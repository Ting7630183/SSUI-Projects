import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import appRoutes from './shared/appRoutes';

import NavBar from './containers/NavBar/NavBar';
import HomePage from './containers/HomePage/HomePage';
import TShirtsPage from './containers/TShirtsPage/TShirtsPage';
import TShirtPage from './containers/TShirtsPage/TShirtPage/TShirtPage';
import CartPage from './containers/CartPage/CartPage';
import Footer from './containers/Footer/Footer';
import UnimplementedPage from './containers/Unimplemented/UnimplementPage';
import './App.css';
import CreateFromPicture from './containers/CreateFromPicture/CreateFromPicture';
import Login from "../src/containers/Login/Login";


import {getAuth, GoogleAuthProvider, signInWithPopup,signOut} from 'firebase/auth';
import {getFirestore,collection, addDoc, query, onSnapshot,setDoc,updateDoc,doc, getDocs } from 'firebase/firestore';


let globalItemCount = 0;
function App(props) {
  const[listItems, setListItems] = useState([])
  const[newItem, setNewItem] = useState([])

  //Use for the search page
  const [listImages, setImageList] = useState([])
  const [defaultImage, setDefaultImage] = useState(true)
  const [keyword, setKeyWord] = useState("")
  var [page, setPage] = useState(1)
  var [placeholder, setPlaceHolder] = useState("Search for pictures")
  const [currentUser, setCurrentUser] = useState(undefined)
  const [userName, setUserName] = useState(undefined)
  const db = getFirestore(props.app)
  const auth = getAuth(props.app)
  const provider = new GoogleAuthProvider();


  useEffect(() => {
    if(currentUser !== undefined) {
      console.log(getAuth(props.app).currentUser)
      var userid = getAuth(props.app).currentUser.uid;
      console.log(userid)
      const userRef = collection(db, "users")
      setDoc(doc(userRef), userid), {
        name: "a",
        price: "$10",
        count: 2,
      }
      
     

    }
    // console.log(getAuth(props.app).currentUser)
    // var userid = getAuth(props.app).currentUser.uid;
    // console.log(userid)
    // const userRef = ref(db, 'users/' + userid)

    // const col = collection(db, "shopping-cart");
    // console.log(col)
    // getDocs(col).then((d) => console.log(d.docs.map((d) =>d.data())))
  })

  function signIn() {
    console.log("enter login function in App")
    signInWithPopup(auth, provider).then((result) =>{
      setCurrentUser(auth.currentUser)
      getUserName()
    }).catch((error)=>{console.log("error in log in")});
  }

  function signOutUser() {
    signOut(getAuth(props.app))
    setCurrentUser(undefined)
    setUserName(undefined)
  }

 // Returns the signed-in user's display name.
 function getUserName() {
  let name = getAuth(props.app).currentUser.displayName;
  console.log(name)
  setUserName(name)
}

  
  function addImageToList(img) {
    if(img.results.length > 0) {
      const image = []
      for(var i = 0; i < 10; i++) {
            image.push(img.results[i].urls.raw)
      }
      setImageList([
        ...listImages,
        ...image
      ])
    }
  }

  function createNewItem(s){
    globalItemCount++;
    setListItems([
      ...listItems,
      {s, id:globalItemCount}
    ]);
  }

  function deleteItem(id) {
    let temp = [...listItems];
    temp.splice(
      temp.findIndex((d)=>d.id ===id), 
      1
    );
    setListItems(temp);
  }

  function updateItemCount(id, count) {
    let temp = [...listItems];
    var item = listItems[temp.findIndex((d)=>d.id ===id)]
    console.log(item)
    if(count > 0) {
      item.s.shirt_counts = count
      setListItems(temp);
    }
  }

  function requestMorePics() {
    setPage(page++)
  }

  function searchPics(key) {
    console.log("enter search function")
    setImageList([])
    setPage(1)
    setKeyWord(key)
    setDefaultImage(false)
    setPlaceHolder(key)
  }

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar itemsList={listItems} userName={userName}/>
      <div className='MainContent'>
        <Routes>
          <Route exact path={appRoutes.home} element={<HomePage/>}></Route>
          <Route exact path={appRoutes.tshirts} element={<TShirtsPage/>}></Route>
          <Route exact path={appRoutes.tshirt} element={<TShirtPage itemsList={listItems} createItem={createNewItem}/>}></Route>
          <Route exact path={appRoutes.cart} element={<CartPage itemsList={listItems} deleteItem={deleteItem} updateItemCount={updateItemCount}/>}></Route>
          <Route exact path={appRoutes.unimplemented} element={<UnimplementedPage/>}></Route>
          <Route exact path={appRoutes.createFromImage} element={<CreateFromPicture itemsList={listItems} listImages ={listImages} page={page} 
                                                                                    keyword={keyword} defaultImage={defaultImage} placeholder={placeholder}
                                                                                    createItem={createNewItem} addImageToList={addImageToList}
                                                                                    requestMorePics={requestMorePics}
                                                                                    searchPics={searchPics}/>}></Route>
          <Route exact path={appRoutes.login} element={<Login  signIn={signIn} signOutUser={signOutUser} userName={userName}/>}></Route>
        </Routes>
      </div>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
