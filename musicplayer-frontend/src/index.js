import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './store/reducers';
import reduxThunk from 'redux-thunk'

import App from './App';

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log(err)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState)
  } catch (err) {
    console.log(err)
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const store = createStore(reducers, persistedState, composeWithDevTools(
  applyMiddleware(reduxThunk)
));

store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>,
                document.getElementById('root'));