import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryWithProducts = () => {

  const { categoryName } = useParams()

  const [category, setCategory] = useState([])

  useEffect(() => {
    axios
        .get(`https://fakestoreapi.com/products/category/${categoryName}`)
        .then((res) => {
            console.log(res)
            setCategory(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}, [])

  return (
    <div>
      <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
      {
        category.map((product) => (
          <Link className="text-decoration-none" to={`/oneProduct/${product.id}`}>
            <div className="d-flex align-items-center my-4" key={product.id}>
              <img className="w-25 mr-4" src={product.image} alt="image" />
              <p className="text-wrap text-dark">{product.description}</p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default CategoryWithProducts