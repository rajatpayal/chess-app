
import "./gameResultModal.css"
function GameResultModal({ isOpen, onClose, resultMessage }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <h2>Game Over</h2>
                    <p>{resultMessage}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default GameResultModal;