
import React from 'react';
import './App.css';
import { useState } from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from './ui/home';
import Game from './ui/game';
import StartingPage from './ui/startingPage';



// socket.emit('dummyMessage','hello are we connected');

const socket = io('http://192.168.1.10:5000');

function App() {
  
  const [currentUserId, setCurrentUserId] = useState(null);

  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingPage socket={socket} setCurrentUserId={setCurrentUserId}/>} />
        <Route path="/home" element={<Home socket={socket} currentUserId={currentUserId}  />} />
        <Route path="/game/:gameId" element={<Game socket={socket}/>} />
      </Routes>
    </Router>
  );
}

export default App;