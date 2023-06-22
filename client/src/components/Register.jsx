import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Register = (props) => {

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
        setUser({...user, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/register', user, {withCredentials:true})
            // withCredentials allows the cookie to be sent from server to client
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
                console.log(err.response.data);
                if(err.response.data.error){
                    setErrors(err.response.data.error.errors)
                }
                else{
                    setEmailError(err.response.data)
                }
            })
    }

    return (
        <div>
            <Link to={'/login'}>Login</Link>
            <form onSubmit={submitHandler}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" onChange={changeHandler} />
                    {
                        errors.firstName ?
                            <p className='text-danger'>{errors.firstName.message}</p> :
                            null
                    }
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" onChange={changeHandler} />
                </div>
                    {
                        errors.lastName ?
                            <p className='text-danger'>{errors.lastName.message}</p> :
                            null
                    }
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" onChange={changeHandler} />
                </div>
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
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={changeHandler} />
                    {
                        errors.password ?
                            <p className='text-danger'>{errors.password.message}</p> :
                            null
                    }
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" onChange={changeHandler} />
                </div>
                    {
                        errors.confirmPassword ?
                            <p className='text-danger'>{errors.confirmPassword.message}</p> :
                            null
                    }
                <button className='btn btn-primary'>Register</button>
            </form>
        </div>
    );
}

export default Register;