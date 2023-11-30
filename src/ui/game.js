import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { useParams,useNavigate } from 'react-router-dom';
import Chess from 'chess.js';
import './game.css'; 

function Game({ socket }) {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState("start");
    const [orientation, setOrientation] = useState('white');
    const { gameId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('startGame', ({ gameId, playerRoles }) => {
            // Check the player's role and set orientation
            if (socket.id === playerRoles.white) {
                setOrientation('white');
            } else if (socket.id === playerRoles.black) {
                setOrientation('black');
            }

            navigate(`/game/${gameId}`);
        });

        socket.on('gameUpdate', (newFen) => {
          setGame(new Chess(newFen));
          setFen(newFen);
        });
    
        socket.on('invalidMove', () => {
          console.log('Invalid move');
          // Handle invalid move (e.g., show an alert or message)
        });
    
        return () => {
          socket.off('gameUpdate');
          socket.off('invalidMove');
        };
      }, [socket]);
    
      const handleMove = (move) => {
        // Attempt to make a move
        const moveResult = game.move(move);
        console.log(gameId);
        if (moveResult) {
          // If valid, emit the move to the server
          socket.emit('move', { gameId, move });
        } else {
          // If invalid, reset the board's position
          setFen(game.fen());
        }
    };

    return (
        <div className="game-container">
            <div className="chessboard-container">
                <Chessboard
                    boardWidth={500}
                    position={fen}
                    boardOrientation={orientation}
                    onPieceDrop={(sourceSquare, targetSquare) => handleMove({
                        from: sourceSquare,
                        to: targetSquare,
                        promotion: 'q'})}
                />
            </div>
        </div>
    );
}

export default Game;