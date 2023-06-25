import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = ({cart, setCart}) => {
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
    <div className="container d-flex justify-content-center mt-4">
    <div className="col-6">
        <form onSubmit={handleSubmit}>
            <div className="form-group row justify-content-center">
                <label htmlFor="nameOnCard" className="col-sm-2 col-form-label">Name on Card:</label>
                <div className="col-sm-6">
                    <input
                        className={`form-control ${errors.nameOnCard ? 'is-invalid' : ''}`}
                        type="text"
                        name="nameOnCard"
                        onChange={handleInputChange}
                    />
                    {errors.nameOnCard && <div className="invalid-feedback">{errors.nameOnCard}</div>}
                </div>
            </div>

            <div className="form-group row justify-content-center">
                <label htmlFor="cardNumber" className="col-sm-2 col-form-label">Card Number:</label>
                <div className="col-sm-6">
                    <input
                        className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                        type="text"
                        name="cardNumber"
                        onChange={handleInputChange}
                    />
                    {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                </div>
            </div>

            <div className="form-group row justify-content-center">
                <label htmlFor="expiryDate" className="col-sm-2 col-form-label">Expiration Date (MM/YYYY):</label>
                <div className="col-sm-6">
                    <input
                        className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                        type="text"
                        name="expiryDate"
                        onChange={handleInputChange}
                    />
                    {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                </div>
            </div>

            <div className="form-group row justify-content-center">
                <label htmlFor="cvv" className="col-sm-2 col-form-label">CVV:</label>
                <div className="col-sm-6">
                    <input
                        className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                        type="text"
                        name="cvv"
                        onChange={handleInputChange}
                    />
                    {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                </div>
            </div>

            <div className="form-group row justify-content-center">
                <label htmlFor="zipCode" className="col-sm-2 col-form-label">ZIP Code:</label>
                <div className="col-sm-6">
                    <input
                        className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                        type="text"
                        name="zipCode"
                        onChange={handleInputChange}
                    />
                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                </div>
            </div>

            <div className="form-group justify-content-center">
                <button type="submit" className="btn btn-secondary mt-3">Submit</button>
            </div>
        </form>
    </div>
</div>

    // <div className="container">
    //   <form onSubmit={handleSubmit} className="mt-5">
    //     <div className="form-group">
    //       <label>Name on Card</label>
    //       <input type="text" name="nameOnCard" onChange={handleInputChange} className="form-control" />
    //       {errors.nameOnCard && <div className="text-danger">{errors.nameOnCard}</div>}
    //     </div>
    //     <div className="form-group">
    //       <label>Card Number</label>
    //       <input type="text" name="cardNumber" onChange={handleInputChange} className="form-control" />
    //       {errors.cardNumber && <div className="text-danger">{errors.cardNumber}</div>}
    //     </div>
    //     <div className="form-group">
    //       <label>Expiry Date (MM/YYYY)</label>
    //       <input type="text" name="expiryDate" onChange={handleInputChange} className="form-control" />
    //       {errors.expiryDate && <div className="text-danger">{errors.expiryDate}</div>}
    //     </div>
    //     <div className="form-group">
    //       <label>CVV</label>
    //       <input type="text" name="cvv" onChange={handleInputChange} className="form-control" />
    //       {errors.cvv && <div className="text-danger">{errors.cvv}</div>}
    //     </div>
    //     <div className="form-group">
    //       <label>ZIP Code</label>
    //       <input type="text" name="zipCode" onChange={handleInputChange} className="form-control" />
    //       {errors.zipCode && <div className="text-danger">{errors.zipCode}</div>}
    //     </div>
    //     <button type="submit" className="btn btn-primary">Submit</button>
    //   </form>
    // </div>
  )
}

export default Payment;
