import React from 'react';
import './header.css';
import {useNavigate} from "react-router-dom";


function Header() {
  const navigate  = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  }
  const handleRegisterClick = () => {
    navigate('/register')
  }
  return (
    <header>
      <nav>
        <ul>
          <li><a >Play</a></li>
          <li><a >Learn</a></li>
          <li><a >Watch</a></li>
          <li><a >Puzzles</a></li>
          <li><a >Community</a></li>
        </ul>
        <div className='buttons'>
          <button className='button' onClick={handleLoginClick}>login</button>
          <button className='button' onClick={handleRegisterClick}>register</button>
        </div>
        
        
      </nav>
    </header>
  );
}

export default Header;