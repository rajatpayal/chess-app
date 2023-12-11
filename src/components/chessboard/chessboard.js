import React from 'react';
import { Chessboard } from 'react-chessboard';
import './chessboard.css';

function ChessboardComponent() {
  const boardStyles = {
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
  };
  return (
    <div id="chessboard">
      <Chessboard 
        customBoardStyles={boardStyles}
        boardWidth={460}
        customDarkSquareStyle={{backgroundColor : '#779952'}}
        customLightSquareStyle={{backgroundColor : '#edeed1'}}      
      />
    </div>
  );
}

export default ChessboardComponent;