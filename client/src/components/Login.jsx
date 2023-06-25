import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsLogged }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const [error, setError] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/login', user, { withCredentials: true })
            // withCredentials allows the cookie to be sent from server to client
            .then((res) => {
                console.log(res);
                setIsLogged(true); // Set isLogged to true after successful login
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
                setError(err.response.data.message)
            })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-4">
                    <h3>Login to get great gear!</h3>
                    {/* <Link to={'/register'}>Register</Link> */}
                    <form onSubmit={submitHandler} className="mt-4">
                        <div className="mb-3 row">
                            <label for="email" className="form-label col-sm-4">Email:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control inputColor" id="email" name="email" onChange={changeHandler} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="password" className="form-label col-sm-4">Password:</label>
                            <div className="col-sm-8">
                                <input type="password" className="form-control inputColor" id="password" name="password" onChange={changeHandler} />
                            </div>
                        </div>
                        {
                            error ?
                                <div className="alert alert-danger mt-3" role="alert">
                                    {error}
                                </div> :
                                null
                        }
                        <button className="btn btn-sm btn-primary mt-3">Login</button>
                        <div className="mt-3">
                            <span>Not already registered? <a href="/register"> Register Here </a> </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
