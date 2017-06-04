import React from 'react';
import { Router, Route, IndexRoute } from "react-router";
import { history } from "app/store/";
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

//import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import Main from 'Main'
import Movies from 'Movies'
import NewMovies from 'NewMovies'
import NewMovie from 'NewMovie'
import Navigation from 'Navigation'
import MoviesApi from 'MoviesApi'
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
      <Route path="movies" component={Movies}/>
      <Route path="new" component={NewMovies}/>
      <Route path="newmovie(/:filename)" component={NewMovie}/>
      <Route path="topics" component={Topics}/>
      <Route path="main" component={Main}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

/*
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)
*/
const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export { router };

//default (
//  BasicExample()
//)