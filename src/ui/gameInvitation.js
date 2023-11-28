import React from 'react';
// import { useEffect } from 'react';
import './gameInvitation.css';

function GameInvitationModal({ notification, callback }) {  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>{notification.message}</h2>
          <div className="modal-actions">
            <button onClick={(e) => callback('Yes')} className="modal-button accept">Accept</button>
            <button onClick={(e) => callback('No')} className="modal-button decline">Decline</button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default GameInvitationModal;