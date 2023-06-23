import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const [error, setError] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/login', user, {withCredentials:true})
            // withCredentials allows the cookie to be sent from server to client
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
                setError(err.response.data.message)
            })
    }

    return (
        <div>
            <Link to={'/register'}>Register</Link>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" onChange={changeHandler} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={changeHandler} />
                </div>
                {
                    error ?
                    <p>{error}</p> :
                    null
                }
                <button>Login</button>
                <div>
                    <span>Not already registered? <a href="/register"> Register Here </a> </span>
                </div>
            </form>
        </div>
    );
}

export default Login;
