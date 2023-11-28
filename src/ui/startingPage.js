import React, { useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import "./startingPage.css";

function StartingPage({socket,setCurrentUserId }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  const handleStartGame = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
        setError('Name cannot be empty');
        return;
      }
      setError('');
    const userId = uuidv4();
    socket.emit('addPlayer',{userId,name}); 
    setCurrentUserId(userId); 
    setName('');
    console.log(userId);
    navigate(`/home`);
  };
  

  return (
    
    <div className="form-container">
      <form className="name-form" onSubmit={handleStartGame}>
        <input
          type="text"
          className="name-input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">
            <Link className='link-button' to="/home">Submit</Link>
        </button>
      </form>
    </div>
  );
}

export default StartingPage;