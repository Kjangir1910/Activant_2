import React, {useState} from "react";
import './App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

   


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await axios.post('https://activant-2-backend-1.onrender.com/api/users/register', {
                name, 
                email,
                address, 
                password
            });
    
            console.log('Registration Response:', response.data);  
    
            if (response.data && response.data.user) {
                const { user } = response.data;  
                localStorage.setItem('userId', user._id); 
                
                setMessage('Registration successful');
                setTimeout(() => {
                    navigate('/products');
                }, 1000);
            } else {
                setMessage('Error during registration. Try again.');
            }
        } catch (error) {
            setMessage('Error registering user');
            console.error('Registration error', error);
        }
    
        setLoading(false);
    };
    
    return (
        <>
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Register User</h2>
                <input type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
               />

                 <input type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
               />

                 <input type="text" 
                placeholder="Address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                required
               />

                 <input type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
               />

               <button type="submit" disabled={loading}>Register</button>
               {loading && <div className="loader">Loading...</div>}
               {message && <p>{message}</p>}
            </form>
        </div>
        </>
    )
}

export default Register
