import React from 'react';
import Payment from './Payment';
import {Link} from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const handleQuantityChange = (event, productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        const quantity = parseInt(event.target.value);
        return {
          ...item,
          quantity: isNaN(quantity) ? 1 : quantity
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

  const deleteHandler = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId)
    setCart(updatedCart)
  }

  return (
    <div className="container">
    <h1>Cart</h1>
    {cart.map((item) => (
      <div className="row align-items-center mb-3" key={item.id}>
        <div className="col-sm-2">
          <img src={item.image} alt={item.title} className="img-fluid" style={{width: '100px', height: '100px'}} />
        </div>
        <div className="col-sm-3">
          <h3 className="font-weight-bold small">{item.title}</h3>
        </div>
        <div className="col-sm-2">
          <p>${item.price} USD</p>
        </div>
        <div className="col-sm-2">
          <div>
            <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
            <input
              type="number"
              id={`quantity-${item.id}`}
              value={item.quantity}
              min={1}
              onChange={(e) => handleQuantityChange(e, item.id)}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-sm-2">
          <button className='btn btn-sm btn-danger' onClick={() => deleteHandler(item.id)}>Remove</button>
        </div>
      </div>
    ))}
    <Link to={'/'}>Continue Shopping?</Link>
    <h3 className="mt-4">Total Price: ${calculateTotalPrice().toFixed(2)} USD</h3>
    <hr/>
      <Payment setCart={setCart}/>
  </div>
);
};

export default Cart;

