import React from 'react'
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import { store } from 'app/store/'
//import { router } from "./router.js";
import { router } from 'app/router/'

var actions = require('actions');
//var store = require('configureStore').configure();

//import Movies from 'Movies'
//import Navigation from 'Navigation'

import MoviesApi from 'MoviesApi'

// App css
//import styles from "applicationStyles;

store.subscribe( () => {

  var state = store.getState();

  console.log("Changed state", state);
  
  if (state.form && state.form.simple && state.form.simple.submitSucceeded) {

    console.log("Update filter title", );
  }
});

MoviesApi.getList().then(function(list) {

  store.dispatch(actions.addMovies(list));
});


 ReactDOM.render(
   <Provider store={store}>
     {router}
  </Provider>,
    document.getElementById('app')
  );
