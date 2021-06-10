import thunk from 'redux-thunk';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {weatherReducer} from '../reducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
