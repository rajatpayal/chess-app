import React, { useState } from 'react';
import './register.css'; // Make sure to create a corresponding CSS file
import { useNavigate} from 'react-router-dom';
import Header from '../headers/header';
const { v4: uuidv4 } = require('uuid');



function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    const handleSubmit = async (event) => {
        const userId = uuidv4();
        event.preventDefault();
        try {
            const response = await fetch('http://192.168.1.9:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId,username, email, password }),
            });
            const data = await response.json();
            if (data.token) {
                console.log('Registration successful');
                navigate('/login');
                // Handle successful registration
            } else {
                console.log('Registration failed');
                // Handle errors
            }
        } catch (error) {
            console.error('Registration error', error);
        }

    };

    return (
        <div>
            <Header/>
            <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2 className="register-title">Register for Chess App</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button" onClick={handleSubmit}>Register</button>
            </form>
        </div>
            
        </div>
        
    );
}

export default Register;
