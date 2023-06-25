import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import OneProduct from './components/OneProduct';
import CategoryWithProducts from './components/CategoryWithProducts';
import Payment from './components/Payment';
import Success from './components/Success';
import Cart from './components/Cart';

function App() {

      // just for fun
      const [title, setTitle] = useState('Site Header!')
      // 1 ) CREATE A STATE TO SAVE THE USER
      const [user, setUser] = useState({})

      // const [isLogged, setIsLogged] = useState(null)

      const [isLogged, setIsLogged] = useState(false);

      
      const [ quantity, setQuantity] = useState ()
      
      const [cart, setCart] = useState(() => {
        // Retrieve the cart from local storage when initializing state
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          return JSON.parse(savedCart);  // Parse the string back into a JavaScript object/array
        } else {
          return [];  // If there's no saved cart, default to an empty array
        }
      });
    
      useEffect(() => {
        // Whenever the cart changes, save it to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar key={user} user={user} setUser={setUser} isLogged={isLogged} setIsLogged={setIsLogged} cart={cart} setCart={setCart} />
        <Routes>
          <Route exact path ="/" element={<LandingPage  />} />
          <Route path='/login' element={<Login setUser={setUser} setIsLogged={setIsLogged} />} />
          <Route path='/register' element={<Register setUser={setUser}setIsLogged={setIsLogged}/>} />
          <Route path='/oneProduct/:productId' element={<OneProduct setUser={setUser} isLogged={isLogged} setIsLogged={setIsLogged} cart={cart} setCart={setCart} quantity={quantity} setQuantity={setQuantity} />} />
          <Route path='/category/:categoryName' element={<CategoryWithProducts />} />
          <Route path='/payment' element={<Payment cart={cart} setCart={setCart} />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cart' element={<Cart cart={cart} setCart={setCart} quantity={quantity} setQuantity={setQuantity}  />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
