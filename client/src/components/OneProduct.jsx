import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const OneProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeHandler = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Perform any necessary actions with the chosen quantity before redirecting
    // navigate(`/cart?quantity=${quantity}`);
    // navigate(`/cart/${productId}?quantity=${quantity}`);
    navigate(`/cart/${productId}/${quantity}`);

  };

  return (
    <div className="container">
      <h1 className="mt-4">{product.title}</h1>
      <div className="d-flex align-items-center my-4">
        <img
          className="w-25 mr-4"
          src={product.image}
          alt="bag"
        />
        <div>
          <p className="text-wrap mx-4">{product.description}</p>
          <p>${product.price} USD</p>
          <form onSubmit={submitHandler}>
            <input
              className="mt-4"
              type="number"
              name="quantity"
              placeholder="quantity"
              value={quantity}
              onChange={changeHandler}
            />
            <button>Add to Cart</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;
