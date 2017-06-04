//import { createStore, applyMiddleware, combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
//import * as redux from 'redux';
//import createHistory from 'history/createBrowserHistory'
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import freeze from "redux-freeze";
//import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { reducers } from "app/reducers/"

//import {filtersReducer, moviesReducer} from 'app/reducers/'

//import * as redux from 'redux';
//import { moviesReducer, filtersReducer } from 'reducers'
//import { reducer as reduxFormReducer  } from 'redux-form';

//const history = createHistory()

//const history = browserHistory;

// add the middlewares
let middlewares = [];

// add the router middleware
middlewares.push(routerMiddleware(browserHistory));

// add the freeze dev middleware
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze);
}

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}


// create the store
const store = createStore(reducers, middleware);
/*
var store = redux.createStore(reducers, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
*/

const history = syncHistoryWithStore(browserHistory, store);

// export
export { store, history };


//  var store = redux.createStore(reducer, initialState, redux.compose(
//    window.devToolsExtension ? window.devToolsExtension() : f => f
 // ));
//
  //return store;
//};

//import * as redux from 'redux';
//import thunk from 'redux-thunk';

//import {searchTextReducer, showCompletedReducer, todosReducer, authReducer} from 'reducers'
/*
export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
        movies: moviesReducer,
    filters: filtersReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
*/