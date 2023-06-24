import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Payment from './Payment';

const Cart = ({ cart, setCart }) => {
  const { productId, quantity } = useParams();

  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const handleQuantityChange = (event, itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: parseInt(event.target.value)
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Perform necessary actions with the cart items before submitting
  // };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="container">
      <h1>Cart</h1>
      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} style={{width: '100px', height: '100px'}}/>
          <h3>{item.name}</h3>
          <p>${item.price} USD</p>
          <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
          <input
            type="number"
            name={`quantity-${item.id}`}
            value={item.quantity}
            min={1}
            onChange={(e) => handleQuantityChange(e, item.id)}
          />
        </div>
      ))}
      <h3>Total Price: ${calculateTotalPrice().toFixed(2)} USD</h3>
        <Payment />
      {/* <form onSubmit={handleSubmit}> */}
        {/* <button type="submit">Proceed to Payment</button> */}
      {/* </form> */}
    </div>
  );
};

export default Cart;
