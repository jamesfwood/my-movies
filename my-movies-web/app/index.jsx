import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import { store } from 'app/store/'
import { router } from 'app/router/'

var actions = require('app/actions/');

import MoviesApi from 'app/api/moviesApi'

// App css
//import styles from "applicationStyles;

//import styles from 'https://www.w3schools.com/w3css/4/w3.css'

store.subscribe( () => {

  var state = store.getState();

  console.log("Changed state", state);
  
 /* if (state.form && state.form.simple && state.form.simple.submitSucceeded) {

    console.log("Update filter title", );
  }*/
  
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
