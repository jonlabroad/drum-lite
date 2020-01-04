import React from 'react';
import ReactDOM from 'react-dom';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, AnyAction, Reducer } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { mainReducer, initialState } from './reducers';
import { MainState } from './types';
import { Provider } from 'react-redux';

const store = configureStore({
    reducer: mainReducer as Reducer<MainState, any>,
    middleware: [thunk as ThunkMiddleware<any, AnyAction>],
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
