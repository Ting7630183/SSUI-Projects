import React, { useState } from 'react';
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

let globalItemCount = 0;
function App() {
  const[listItems, setListItems] = useState([])
  // const[newItem, setNewItem] = useState([])

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

  
  return (
    <div className="App">
      
      <BrowserRouter>
      <NavBar itemsList={listItems}/>
      <div className='MainContent'>
        <Routes>
          <Route exact path={appRoutes.home} element={<HomePage/>}></Route>
          <Route exact path={appRoutes.tshirts} element={<TShirtsPage/>}></Route>
          <Route exact path={appRoutes.tshirt} element={<TShirtPage itemsList={listItems} createItem={createNewItem}/>}></Route>
          <Route exact path={appRoutes.cart} element={<CartPage itemsList={listItems} deleteItem={deleteItem} updateItemCount={updateItemCount}/>}></Route>
          <Route exact path={appRoutes.unimplemented} element={<UnimplementedPage/>}></Route>
        </Routes>
      </div>
      <Footer />
      </BrowserRouter>
      

      
      







    </div>
  );
}

export default App;
