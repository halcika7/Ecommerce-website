import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { combinedReducers } from './reducers';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

export const store = createStore(combinedReducers, applyMiddleware(thunk) );