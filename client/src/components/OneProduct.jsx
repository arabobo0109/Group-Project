import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const OneProduct = () => {

    const { productId } = useParams()

    const [product, setProduct] = useState({})

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => {
                console.log(res)
                setProduct(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="container">
            <h1 className="mt-4">{product.title}</h1>
            <div className="d-flex align-items-center my-4">
                <img className="w-25 mr-4" src={product.image} alt="bag" />
                <p className="text-wrap">{product.description}</p>
            </div>
        </div>
    );
}

export default OneProduct;
