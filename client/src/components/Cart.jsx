import React from 'react';
import Payment from './Payment';

const Cart = ({ cart, setCart }) => {
  const handleQuantityChange = (event, productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: parseInt(event.target.value),
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="container">
      <h1>Cart</h1>
      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} style={{width: '100px', height: '100px'}}/>
          <h3>{item.title}</h3>
          <p>${item.price} USD</p>
          <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
          <input
            type="number"
            id={`quantity-${item.id}`}
            value={item.quantity}
            min={1}
            onChange={(e) => handleQuantityChange(e, item.id)}
          />
        </div>
      ))}
      <h3>Total Price: ${calculateTotalPrice().toFixed(2)} USD</h3>
        <Payment />
    </div>
  );
};

export default Cart;

