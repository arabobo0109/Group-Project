import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const LandingPage = () => {
  const [data, setData] = useState({
    electronics: {},
    jewelery: {},
    mens_clothing: {},
    womens_clothing: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      const electronics = await axios.get('https://fakestoreapi.com/products/category/electronics');
      const jewelery = await axios.get('https://fakestoreapi.com/products/category/jewelery');
      const mens_clothing = await axios.get('https://fakestoreapi.com/products/category/men%27s%20clothing');
      const womens_clothing = await axios.get('https://fakestoreapi.com/products/category/women%27s%20clothing');

      setData({
        electronics: electronics.data[0],
        jewelery: jewelery.data[0],
        mens_clothing: mens_clothing.data[0],
        womens_clothing: womens_clothing.data[0]
      });
    };
    fetchData();
  }, []);

  const renderCategory = (category, item) => (
    <div key={category} className="col-lg-3 col-md-6 mb-3">
      <div className="card h-100">
        <Link to={`/category/${category.toLowerCase()}`}><img src={item.image} alt={category} className="card-img-top" style={{width: '200px', height: '200px'}} /></Link>
        <div className="card-body">
          <h5 className="card-title">{category}</h5>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-3">
      <h1 className="text-center">Best Sellers!</h1>
      <div className="row">
        {renderCategory('Electronics', data.electronics)}
        {renderCategory('Jewelery', data.jewelery)}
        {renderCategory("Men's Clothing", data.mens_clothing)}
        {renderCategory("Women's Clothing", data.womens_clothing)}
      </div>
    </div>
  )
}

export default LandingPage;