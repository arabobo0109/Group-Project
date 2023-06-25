import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center text-success">Purchase Successful!</h1>
            <p className="text-center">Thank you for your purchase. Your order is being processed and will be shipped to you soon.</p>
            <Link to={'/'}>Continue Shopping?</Link>
        </div>
    )
}

export default Success;