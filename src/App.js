import './App.css';
import React from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from './ui/home';
import Game from './ui/game';
import StartingPage from './ui/startingPage';



// socket.emit('dummyMessage','hello are we connected');

const socket = io('http://localhost:4000');

function App() {
  
  const [currentUserId, setCurrentUserId] = useState(null);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingPage socket={socket} setCurrentUserId={setCurrentUserId}/>} />
        <Route path="/home" element={<Home socket={socket} currentUserId={currentUserId} />} />
        <Route path="/game" element={<Game socket={socket}/>} />
      </Routes>
    </Router>
  );
}

export default App;