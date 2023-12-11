import React from 'react';
import './sidebar.css';
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="profile-section">
          <h3>User Profile</h3>
          <p>Username: JohnDoe</p>
          <p>Rating: 1200</p>
          {/* More user profile details */}
      </div>
      <div className="game-options-section">
          <h3>Game Options</h3>
          <button>New Game</button>
          <button>Join Game</button>
          {/* More game options */}
      </div>
    </aside>
  );
}

export default Sidebar;