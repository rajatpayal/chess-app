import App from './App';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import  store from './store';

const savedUserId = localStorage.getItem('currentUserId');
const savedGameData = localStorage.getItem('currentGameData');



if (savedUserId !== null) { 
    
    store.dispatch({ type: 'SET_CURRENT_USER', payload: savedUserId });
}

if(savedGameData !==null){
    store.dispatch({ type: 'SET_CURRENT_GAME', payload: savedGameData});
}




ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
