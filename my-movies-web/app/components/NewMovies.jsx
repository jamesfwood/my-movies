import React from 'react';
//import { Link } from 'react-router-dom'
var {connect} = require('react-redux');
//import { withRouter } from 'react-router-dom'

import NewMovieTile from 'app/components/NewMovieTile'
import MoviesApi from 'app/api/moviesApi'

export class NewMovies extends React.Component {

    render() {

        var {movies} = this.props;

        var filteredList = movies;

        filteredList = filteredList.filter( (movie) => {
              return !movie.tmdb;
            });

  /*      var newList = [];

        movies.forEach( (movie) => {
                if (!movie.themoviedb_id)
                    newList.push(movie);
            });
       */     
        return (
             <div>      
            <h2>Unmatched movies</h2>
  
              <div className="container-fluid">
                <ul className="list-group">
                  {
                    filteredList.map( (movie) =>
                        <NewMovieTile key={movie.filename} {...movie} />

                    )
                  }
                 </ul>
              </div>

              </div>
            
        )
    }
}


export default connect(
    (state) => {
    return state;
  }
)(NewMovies)