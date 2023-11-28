import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import Chess from 'chess.js';

function Game({ socket }) {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState("start");
    const [orientation, setOrientation] = useState('white');

    useEffect(() => {
        if (socket) {
            socket.on('move', (data) => {
                if (game.move(data.move)) {
                    setOrientation(data.orientation); 
                    updateGame();
                }
            });
        }
        
        return () => socket && socket.off('move');
    }, [socket,game]);

    const handleMove = (sourceSquare, targetSquare) => {
        const moveObj = { from: sourceSquare, to: targetSquare, promotion: 'q' };
        if (game.move(moveObj)) {
            const newOrientation = orientation === 'white' ? 'black' : 'white';
            socket.emit('move', { move: moveObj, orientation: newOrientation });
            setOrientation(newOrientation); 
            updateGame();
        }
    };

    const updateGame = () => {
        setFen(game.fen());
    };

    return (
        <div className="App">
            <Chessboard
                boardWidth={500}
                position={fen}
                boardOrientation={orientation}
                onPieceDrop={(sourceSquare, targetSquare) => handleMove(sourceSquare, targetSquare)}
            />
        </div>
    );
}

export default Game;