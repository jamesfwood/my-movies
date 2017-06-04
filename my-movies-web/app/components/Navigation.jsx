import React from 'react'
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

var {connect} = require('react-redux');
//import { withRouter } from 'react-router-dom'
var actions = require('actions');

export class Navigation extends React.Component {

handleSubmit (e) {
    e.preventDefault();
    
    console.log("sort by title");

    var {dispatch} = this.props;

    dispatch(actions.sortBy('title'));
  }

handleSubmitRuntime (e) {
    e.preventDefault();
    
    console.log("sort by runtime");

    var {dispatch} = this.props;

    dispatch(actions.sortBy('runtime'));
  }

  render() {
      return (
            <div>
          <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand"to="/">My Movies</Link>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link"to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"to="/movies">Watchlist</Link>
              </li>
                <li className="nav-item">
                <Link className="nav-link"to="/new">New Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"to="/topics">Topics</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"to="/main">Main</Link>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Filters
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item">
                    <form onSubmit={this.handleSubmitRuntime.bind(this)}>
                        <button className="button btn-outline-success">Sort by Runtime</button>
                      </form>
                  </a>
                  <a className="dropdown-item">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <button className="button btn-outline-success">Sort by Title</button>
                      </form>
                  </a>

                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
              <button className="btn btn-outline-success" type="button" onClick={this.sortByTitle}>Sort by Title</button>
              <button className="btn btn-outline-success" type="button" onClick={this.sortByRuntime}>Sort by Runtime</button>
              <button className="btn btn-outline-success" type="button" onClick={this.toggleWatched}>Toggle Watched</button>

            </div>
          )
      }
}

export default /*withRouter(*/connect(
    (state) => {
    return state;
  }
)(Navigation)
