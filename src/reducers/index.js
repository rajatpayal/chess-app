import { combineReducers } from 'redux';
import userReducer from './userReducer';

// ... import other reducers ...

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;