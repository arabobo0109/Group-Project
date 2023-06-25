import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = ({ cart, setCart }) => {
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
        zipCode: ''
    });

    const [errors, setErrors] = useState({
        cardNumber: null,
        expiryDate: null,
        cvv: null,
        nameOnCard: null,
        zipCode: null
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setCardDetails({ ...cardDetails, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateCardDetails();

        if (Object.values(validationErrors).some(error => error !== null)) {
            setErrors(validationErrors);
            return;
        }
        // Reset the cart to an empty array
        console.log("setCart is: ");

        setCart([]);

        // Clear the cart data from local storage if it's stored there
        localStorage.removeItem('cart');
        navigate('/success');
    }

    const validateCardDetails = () => {
        const cardNumberRegex = /^\d{16}$/;
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
        const cvvRegex = /^\d{3,4}$/;
        const zipCodeRegex = /^\d{5}$/;

        return {
            cardNumber: cardNumberRegex.test(cardDetails.cardNumber) ? null : 'Card number must be 16 digits',
            expiryDate: expiryDateRegex.test(cardDetails.expiryDate) ? null : 'Expiry date must be in MM/YYYY format',
            cvv: cvvRegex.test(cardDetails.cvv) ? null : 'CVV must be 3 or 4 digits',
            nameOnCard: cardDetails.nameOnCard ? null : 'Name on card is required',
            zipCode: zipCodeRegex.test(cardDetails.zipCode) ? null : 'ZIP code must be 5 digits'
        };
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <label htmlFor="nameOnCard" className="form-label col-sm-4">Name on Card:</label>
                            <div className="col-sm-8">
                                <input
                                    className={`form-control inputColor ${errors.nameOnCard ? 'is-invalid' : ''}`}
                                    type="text"
                                    name="nameOnCard"
                                    onChange={handleInputChange}
                                />
                                {errors.nameOnCard && <div className="invalid-feedback">{errors.nameOnCard}</div>}
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="cardNumber" className="form-label col-sm-4">Card Number:</label>
                            <div className="col-sm-8">
                                <input
                                    className={`form-control inputColor ${errors.cardNumber ? 'is-invalid' : ''}`}
                                    type="text"
                                    name="cardNumber"
                                    onChange={handleInputChange}
                                />
                                {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="expiryDate" className="form-label col-sm-4">Expiration Date:</label>
                            <div className="col-sm-8">
                                <input
                                    className={`form-control inputColor ${errors.expiryDate ? 'is-invalid' : ''}`}
                                    type="text"
                                    name="expiryDate"
                                    placeholder='MM/YYYY'
                                    onChange={handleInputChange}
                                />
                                {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="cvv" className="form-label col-sm-4">CVV:</label>
                            <div className="col-sm-8">
                                <input
                                    className={`form-control inputColor ${errors.cvv ? 'is-invalid' : ''}`}
                                    type="text"
                                    name="cvv"
                                    onChange={handleInputChange}
                                />
                                {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="zipCode" className="form-label col-sm-4">ZIP Code:</label>
                            <div className="col-sm-8">
                                <input
                                    className={`form-control inputColor ${errors.zipCode ? 'is-invalid' : ''}`}
                                    type="text"
                                    name="zipCode"
                                    onChange={handleInputChange}
                                />
                                {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-sm btn-primary mt-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Payment;
