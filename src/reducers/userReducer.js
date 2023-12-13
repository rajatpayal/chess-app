// reducers/userReducer.js
const initialState = {
    currentUser: null
    // ... other state ...
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            };
        case 'SET_CURRENT_GAME':
            return{
                ...state,
                gameData: action.payload
            }
        default:
            return state;
    }
}
