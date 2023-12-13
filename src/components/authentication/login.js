import React, { useEffect, useState } from 'react';
import './login.css';
import { useNavigate} from 'react-router-dom';
import Header from '../headers/header';
import { useDispatch } from 'react-redux';  

function Login({socket}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [player,setPlayer]= useState({});

    
    //console.log(socket);

    const handleRegister = () =>{
        navigate('/register')
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://192.168.1.9:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            
            // debugger;
            if (data.token) {
                console.log(socket.id);
                socket.emit('addPlayer',data.token);
                setPlayer(data);
                console.log('Login successful');
                    dispatch({
                        type: 'SET_CURRENT_USER',
                        payload: data.id// userData contains the user's information
                    });
                    localStorage.setItem('currentUserId', data.id);
                    navigate('/home')
                // Save the token, navigate to dashboard or do something else
            } else {
                console.log('Login failed');
                // Handle errors
            }
        } catch (error) {
            console.error('Login error', error);
        }
    };
    
    // const handleLoginCLick = () =>{
    //     // In your login action
        
    //     e.preventDefault;
    //     navigate('/home')
    // }

    return (
        <div>
        <Header/>
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2 className="login-title">Login to Chess App</h2>
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
                    <button type="submit" className="login-button" on onSubmit={handleSubmit} >Login</button>
                </form>

                <button onClick={handleRegister}>dont have an account?</button>
            </div>
        </div>
    );
}

export default Login;
