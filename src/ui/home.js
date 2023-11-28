import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import GameInvitationModal from './gameInvitation';

function Home({socket,currentUserId}) {

    const [players, setPlayers] = useState([]);

    const [notifications, setNotifications] = useState([]);
  
    const [searchPlayer, setSearchPlayer] = useState('');

    useEffect(() => {
      socket.on('updatePlayers', (updatedPlayers) => {
        // console.log(updatedPlayers.id);  
        setPlayers(updatedPlayers);
      });
      socket.on('gameInvitation', (invitation) => {
        console.log('Game invitation received:', invitation);
        setNotifications([...notifications, 
            {action:['Yes', 'No'],
            message: 'Do you want to play with Golli?',
            referenceId: 'fsrwwef',
            notificationType: 'GameReq'
          }
        ]);
      });

      console.log(socket.id);
    
      return () => socket.off('gameInvitation');

    }, [socket]);

    const handlePlayClick = (playerUuid) => {
        socket.emit('playRequest',playerUuid)
        console.log(`Play button clicked for player: ${playerUuid}`);
    };

    const handleNotificationCallback = (notification) => (action) => {
      console.log(`${action} taken for ${notification.referenceId}`)      
    }
    
  

  return (
    <div className="players-container">
      {
        notifications.map((notification) => {
          return <GameInvitationModal key={notification.referenceId} notification={notification} callback={handleNotificationCallback(notification)} />
      })
    }
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search players..."
        value={searchPlayer}
        onChange={(e) => setSearchPlayer(e.target.value)}
      />
    </div>
    <h3 className='list-heading'>Recently online player :</h3>
    <ul className="players-list">
      {players.filter(player => player.id !== currentUserId)
     .map(player => (
          <li key={player.id}>
            {player.name}
            <button className="play-button" onClick={() => handlePlayClick(player.id)}>
              <Link className='link-button' to="/game">Play</Link>
            </button>
          </li>
     
     ))}
    </ul>

  </div>
  );
}

export default Home;