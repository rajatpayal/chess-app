import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { useParams,useNavigate } from 'react-router-dom';
import GameResultModal from './gameResultModal';
import Chess from 'chess.js';
import './game.css'; 

function Game({ socket,currentGameData }) {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState("start");
    const [orientation, setOrientation] = useState('white');
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [inviterName,SetInviterName]= useState("");
    const [inviteeName,SetInviteeName]= useState("");
    const [playerId,setPlayerId] = useState("");
    const [squareStyles, setSquareStyles] = useState({});
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameResultMessage, setGameResultMessage] = useState('');

    function findKingPosition(game, color) {
      const board = game.board();
      for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
              const piece = board[i][j];
              
              if (piece && piece.type === 'k' && piece.color === color) {
                  return String.fromCharCode(97 + j) + (8 - i);
              }
          }
      }
      return null; // If king not found (which shouldn't happen in a valid game)
    }

    useEffect(() => {
        console.log(currentGameData)
        const playerRoles = currentGameData.playerRoles;
        const playerNames = currentGameData.playerNames;
          
        if (socket.id === playerRoles.white) {
          console.log(playerRoles.white);
            setPlayerId(playerRoles.white)
            setOrientation('white');
        } else if (socket.id === playerRoles.black) {
          console.log(playerRoles.black);
            setPlayerId(playerRoles.black)
            setOrientation('black');
        }
        
        SetInviterName(playerNames.white);
        SetInviteeName(playerNames.black);
      

        socket.on('gameUpdate', ({ fen, isInCheck ,isCheckmate, isDraw}) => {
          const updatedGame = new Chess(fen);
          setGame(updatedGame);
          setFen(fen);
          console.log(isCheckmate);
  
          if (isInCheck) {
              const kingColor = updatedGame.turn() === 'w' ? 'w' : 'b';
              const kingPosition = findKingPosition(updatedGame, kingColor);
              console.log(kingPosition)
              setSquareStyles({ [kingPosition]: { backgroundColor: 'red' } });
          } else {
              setSquareStyles({});
          }
          if (isCheckmate) {    
              setIsGameOver(true);
              setGameResultMessage('Checkmate! Game over.');
        } else if (isDraw) {
            setIsGameOver(true);
            setGameResultMessage('Draw! Game over.');
        }
      });
    
        socket.on('invalidMove', () => {
          console.log('Invalid move');
          // Handle invalid move (e.g., show an alert or message)
        });
    
        return () => {
          socket.off('gameUpdate');
          socket.off('invalidMove');
        };
      }, [socket,game]);
    
      const handleMove = (move) => {

        // Attempt to make a move
        console.log(orientation);
        
        if(game.turn()=== orientation.charAt(0)){
          const moveResult = game.move(move)
          if (moveResult) {     
            // If valid, emit the move to the server
            socket.emit('move', { gameId, move });
            
          } else {
            // If invalid, reset the board's position
            setFen(game.fen());
          }
        }
        
        
        
        // console.log(gameId);
        
    };
    const handleCloseModal = () => {
      setIsGameOver(false);
      
   };

    return (
        <div className="game-container">
             <div className="player-name white-player">{inviterName}</div>
            <div className="chessboard-container">
                <Chessboard
                    customSquareStyles={squareStyles}
                    showBoardNotation
                    snapToCursor
                    boardWidth={360}
                    position={fen}
                    boardOrientation={orientation}
                    onPieceDrop={(sourceSquare, targetSquare) => handleMove({
                        from: sourceSquare,
                        to: targetSquare,
                        promotion: 'q'})}
                />
            </div>
            <div className="player-name black-player">{inviteeName}</div>
            <GameResultModal 
                isOpen={isGameOver} 
                onClose={handleCloseModal} 
                resultMessage={gameResultMessage} 
            />
        </div>
    );
}

export default Game;