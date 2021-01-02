import 'focus-visible';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import './index.scss';

import reducer from './store/reducer';
import App from './App';
import reportWebVitals from './reportWebVitals';

// @ts-ignore
const reduxDevTols = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = typeof window === 'object' && reduxDevTols ? reduxDevTols({}) : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
