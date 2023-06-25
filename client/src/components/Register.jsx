import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Register = ({ setIsLogged }) => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const [emailError, setEmailError] = useState({})

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/register', user, { withCredentials: true })
            // withCredentials allows the cookie to be sent from server to client
            .then((res) => {
                console.log(res);
                console.log("MADE IT!!!!!")
                setIsLogged(true);
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
                console.log(err.response.data);
                if (err.response.data.error) {
                    setErrors(err.response.data.error.errors)
                }
                else {
                    setEmailError(err.response.data)
                }
            })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-4">
                    <h3>Register to get great gear!</h3>
                    {/* <a className="btn btn-primary" role="button" href='/login'>Login</a> */}
                    <form onSubmit={submitHandler} className="mt-4">
                        <div className="row">
                            <div className="col-12 mb-3 row">
                                <label for="firstName" className="form-label col-sm-4">First Name:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control inputColor" id="firstName" name="firstName" onChange={changeHandler} />
                                    {
                                        errors.firstName ?
                                            <p className='text-danger'>{errors.firstName.message}</p> :
                                            null
                                    }
                                </div>
                            </div>
                            <div className="col-12 mb-3 row">
                                <label for="lastName" className="form-label col-sm-4">Last Name:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control inputColor" id="lastName" name="lastName" onChange={changeHandler} />
                                    {
                                        errors.lastName ?
                                            <p className='text-danger'>{errors.lastName.message}</p> :
                                            null
                                    }
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="email" className="form-label col-sm-4">Email:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control inputColor" id="email" name="email" onChange={changeHandler} />
                                    {
                                        errors.email ?
                                            <p className='text-danger'>{errors.email.message}</p> :
                                            null
                                    }
                                    {
                                        emailError.message ?
                                            <p className='text-danger'>{emailError.message}</p> :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-3 row">
                                <label for="password" className="form-label col-sm-4">Password:</label>
                                <div className="col-sm-8">
                                    <input type="password" className="form-control inputColor" id="password" name="password" onChange={changeHandler} />
                                    {
                                        errors.password ?
                                            <p class='text-danger'>{errors.password.message}</p> :
                                            null
                                    }
                                </div>
                            </div>
                            <div className="col-12 mb-3 row">
                                <label for="confirmPassword" className="form-label col-sm-4">Confirm Password:</label>
                                <div className="col-sm-8">
                                    <input type="password" className="form-control inputColor" id="confirmPassword" name="confirmPassword" onChange={changeHandler} />
                                    {
                                        errors.confirmPassword ?
                                            <p className='text-danger'>{errors.confirmPassword.message}</p> :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-sm btn-primary mt-3'>Register</button>
                        <div className="mt-3">
                            <span>Already a member? <a href="/login"> Login Here </a> </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;