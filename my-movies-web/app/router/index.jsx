import React from 'react';
import { Router, Route, IndexRoute } from "react-router";
import { history } from "app/store/";

import Main from 'app/components/Main'
import VisibleMovies from 'app/components/VisibleMovies'
import NewMovies from 'app/components/NewMovies'
import NewMovie from 'app/components/NewMovie'
import Navigation from 'app/components/Navigation'
import MoviesApi from 'app/api/moviesApi'
import NotFound from 'app/components/NotFound'
import App from 'app/components/App'
import Home from 'app/components/Home'

/*
  <Router>
    <div>
      <Navigation/>
      <Route exact path="/" component={Home}/>
      <Route path="/movies" component={Movies}/>
      <Route path="/new" component={NewMovies}/>
      <Route path="/newmovie" component={NewMovie}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/main" component={Main}/>
    </div>
  </Router>


const router = () => (

    <Router>
      <div>
        <Navigation/>
      <Route exact path="/" component={Home}/>
      <Route path="/movies" component={Movies}/>
      <Route path="/new" component={NewMovies}/>
      <Route path="/newmovie" component={NewMovie}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/main" component={Main}/>
      </div>
    </Router>
 
)
*/

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="movies" component={VisibleMovies}/>
      <Route path="new" component={NewMovies}/>
      <Route path="newmovie(/:filename)" component={NewMovie}/>
      <Route path="main" component={Main}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);


export { router };

//default (
//  BasicExample()
//)