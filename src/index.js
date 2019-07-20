import React from 'react';
import ReactDOM from 'react-dom';
// import RouteService from './Router/RouteService';
import App from './App';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';

  
ReactDOM.render(<App />, document.getElementById('root'));
