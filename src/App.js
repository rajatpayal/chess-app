
import React from 'react';
import './App.css';
import { useState } from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from './ui/home';
import Game from './ui/game';
import StartingPage from './ui/startingPage';
import FirstPage from './ui/firstPage';
import Login from './components/authentication/login';
import Register from './components/authentication/register';
import { useSelector } from 'react-redux';



// socket.emit('dummyMessage','hello are we connected');

const socket = io('http://192.168.1.9:5000');

function App() {
  
  // const [currentUserId, setCurrentUserId] = useState(null);

  const currentUserId = useSelector((state) => 
    state.user.currentUser
  );
  const currentGameData = useSelector((state) =>
    state.user.gameData
  )
  console.log(currentGameData);

  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login socket={socket}/>} />
        <Route path="/start" element={<StartingPage socket={socket}/>} />
        <Route path="/home" element={<Home socket={socket} currentUserId={currentUserId}  />} />
        <Route path="/game/:gameId" element={<Game socket={socket} currentGameData={currentGameData}/>} />
      </Routes>
    </Router>
  );
}

export default App;