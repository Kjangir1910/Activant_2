import React, {useState} from "react";
import axios from "axios";
import './App.css'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false);
const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
        const response =  await axios.post('https://activant-2-backend-1.onrender.com/api/users/login', {
            email, 
            password,
        })
        const {user} = response.data
        localStorage.setItem('userId', user._id)
        setMessage('Login successful')
        navigate('/products');
    } catch (error) {
        setMessage('Unable to login')
        console.error('Login error', error)
    }
    setLoading(false);

}
    return (<>
    <div className="auth-container">
        <form onSubmit={handleSubmit}>
            <h2>Login user</h2>
            <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>Login</button>
            {loading && <div className="loader">Loading...</div>}

            {message && <p>{message}</p>}
        </form>
        <p>
            Don't Have account? <Link to="/register">Register here</Link>
        </p>
    </div>

    </>)
}

export default Login
