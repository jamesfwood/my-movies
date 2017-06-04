import React from 'react';
var {connect} = require('react-redux');
//import { withRouter } from 'react-router-dom'

import MovieTile from 'MovieTile'
//import MoviesApi from 'MoviesApi'
//var actions = require('actions');


// TODO: Add Move Rating pic instead of just the letters.  
/*
    function sortDuration(a, b) {
      if (!a.duration || !b.duration || a.duration === b.duration)
          return 0;

      return a.duration - b.duration;
    }

    function sortTitle(a, b)  {

  /*      if (!a.title) {
          console.log("a.title empty", a.filename)
          return 0;
        }
        if (!b.title) {
          console.log("b.title empty", b.filename)
          return 0;
        }
  */
 /*       if (!a.title || !b.title || a.title === b.title)
          return 0;

        return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
    }
*/

export class Movies extends React.Component {

/*
    resize = () => {
        console.log("Window size", window.innerWidth);
        this.setState({ viewportWidth: window.innerWidth });
    }


    componentDidMount () {
       // window.addEventListener('resize', this.resize);
       console.log("Movies:componentDidMount");
    }
/*
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
*/
  /*  sortByTitle = () => {
      console.log("sortBy title!");

      var {dispatch} = this.props;

      dispatch(actions.sortBy('title'));
    }
    
    sortByRuntime = () => {
      console.log("sortBy runtime!");

      var {dispatch} = this.props;

      dispatch(actions.sortBy('runtime'));
    }

    toggleWatched = () => {
      console.log("toggle watched!");

      var {dispatch} = this.props;

      dispatch(actions.toggleWatched());
    }

*/
    render() {
        var {movies, filters} = this.props;

//TODO: Look up redux shopping cart example
// TODO: Use selectors:  reactjs / reselect

        var renderMovies = () => {

    //      var filteredList = movies;

    /*      if (!filters.showWatched) {
            filteredList = filteredList.filter( (movie) => {
                return !movie.watched;
              });
          }

        console.log("Movies componentDidMount.  filteredList Movie count", filteredList.length);
        console.log("filters.showWatched", filters.showWatched);
          var sortfunc = sortTitle;

          if (filters.sortBy === 'runtime')
            sortfunc = sortDuration;

          var sorted = filteredList.sort( sortfunc );
 */
//         var width = (this.state.viewportWidth - 20) / 3;

          return movies.map( (movie) => {
              return (
                <MovieTile key={movie.filename} {...movie}/>
              );
            });
        };
      
        return (
            <div>
              <div className="container-fluid">
                <div className="row">
                  { renderMovies() }
              </div>
              </div>
            </div>
        );
    }
}

export default /*withRouter(*/connect(
    (state) => {
    return state;
  }
)(Movies)
