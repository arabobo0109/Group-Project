import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { productId, quantity } = useParams();

  const [product, setProduct] = useState({});

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
        setCartItems([
          {
            id: res.data.id,
            name: res.data.title,
            image: res.data.image,
            price: res.data.price,
            quantity: 1
          }
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform necessary actions with the cart items before submitting
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="container">
      <h1>Cart</h1>
      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />
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
      <form onSubmit={handleSubmit}>
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Cart;
