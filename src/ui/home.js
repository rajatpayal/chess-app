import React, { useState,useEffect } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import './home.css';
import GameInvitationModal from './gameInvitation';
import { v4 as uuidv4 } from "uuid";
import Header from '../components/headers/header';
import { useDispatch } from 'react-redux'; 

function Home({socket,currentUserId}) {

    const [players, setPlayers] = useState([]);

    const [notifications, setNotifications] = useState([]);
  
    const [searchPlayer, setSearchPlayer] = useState('');

    const [opponentPlayerId, setOpponentPlayerId] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
      
      socket.emit('reconnect',{userId:currentUserId});
      

      socket.on('joinGameRoom', (data) => {
        debugger;
        
        dispatch({
          type: 'SET_CURRENT_GAME',
          payload: data// userData contains the user's information
        });
        localStorage.setItem('currentGameData', data);
        navigate(`/game/${data.gameId}`);
      });
      
      const fetchPlayers = async () =>{
        try{
          
          const response = await fetch(`http://localhost:5000/api/users/players?userId=${currentUserId}`);
          if(!response.ok) throw new console.error('response is not ok');
          const data = await response.json();
          setPlayers(data);
          
        }
        catch(error){
          console.log('fetch error:',error);
        }
      }

      fetchPlayers(); 

      socket.on('gameInvitation', (invitation) => {
        console.log('Game invitation received:', invitation);
        setNotifications([...notifications, 
            {action:['Yes', 'No'],
            message: 'Do you want to play with Golli?',
            from: invitation.from,
            gameId: invitation.gameId,
            referenceId: 'fsrwwef',
            notificationType: 'GameReq'
          }
        ]);
      });

      return () =>{
                  socket.off('gameInvitation');
                  socket.off('updatePlayers');
                  socket.off('startGame');
                  }

    }, [socket,navigate]);

    const handlePlayClick = (playerUuid) => {
        const gameId  = uuidv4();

        socket.emit('playRequest',{ from: currentUserId, to: playerUuid,gameId })
        console.log(`Play button clicked for player: ${playerUuid}`);
    };

    const handleNotificationCallback = (notification) => (action) => {
      if (action === 'Yes') {
        
        console.log(notification.from);
        socket.emit('acceptInvitation', { gameId: notification.gameId,
           invitingPlayerId: notification.from});

        
        // navigate(`/game/${notification.gameId}`);

        

      }
      console.log(`${action} taken for ${notification.referenceId}`)      
    }
    
  

  return (
    <div>
        <Header/>
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
        {players.map(player => (
            <li key={player.username}>
              {player.username}
              <button className="play-button" onClick={() => handlePlayClick(player.userId)}>
                <Link className='link-button' to="/game">Play</Link>
              </button>
            </li>
      
      ))}
      </ul>

    </div>
  </div>
    
  );
}

export default Home;