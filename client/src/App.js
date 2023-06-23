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

function App() {

      // just for fun
      const [title, setTitle] = useState('Site Header!')
      // 1 ) CREATE A STATE TO SAVE THE USER
      const [user, setUser] = useState(null)
      
      useEffect(() => {
        axios
          .get('http://localhost:8000/api/user-current', { withCredentials: true })
          .then(res => {
            setUser(res.data);
          })
          .catch(err => {
            console.log("current user error: " + err);
            setUser(null);
          });
      }, []);

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route exact path ="/" element={<LandingPage  />} />
          <Route path='/login' element={<Login setUser={setUser}/>} />
          <Route path='/register' element={<Register setUser={setUser} />} />
          <Route path='/oneProduct/:productId' element={<OneProduct />} />
          <Route path='/category/:categoryName' element={<CategoryWithProducts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
