import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './store/reducers';
import reduxThunk from 'redux-thunk'

import App from './App';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk)
));


ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>,
                document.getElementById('root'));