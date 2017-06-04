
import React from 'react';
var {connect} = require('react-redux');
//import { withRouter } from 'react-router-dom'
var actions = require('actions');

//import theMovieDb from 'themoviedb-javascript-library'

import omdbApi from 'app/api/omdbApi.jsx'

function convertMillis(millis) {

    var x = millis / 1000
    var seconds = Math.floor(x % 60)
    x /= 60
    var minutes = Math.floor(x % 60)
    x /= 60
    var hours = Math.floor(x)

    return hours + "h " + minutes + "min";
}

export class MovieTile extends React.Component {
/*
// constructor
  constructor(props) {
    super(props);

    // default ui local state
    this.state = {
      movie: props
    };
  }
*/
    componentDidMount() {

//debugger;
        var {poster, filename, dispatch} = this.props;
 //       console.log("MovieTile Width", props.width);

        if (!poster && this.props.imdb_id) {

            var lsMovie = localStorage.getItem('movie-' + this.props.imdb_id);

            if (lsMovie) {
                try {
                    var result = JSON.parse(lsMovie);

                    dispatch(actions.updateMovie(filename, result));
                }
                catch (e) {
                }
            }
            else {
         //       var self = this;
                var movie = this.props;
        
                omdbApi.getMovie(movie.imdb_id).then( (res) => {

                    localStorage.setItem('movie-' + movie.imdb_id, JSON.stringify(res));

                    dispatch(actions.updateMovie(filename, res));

                }).catch( (e) => {
                    console.log("Error omdbApi:getMovie", e);
                });



                    /*

                theMovieDb.movies.getById({"id": movie.themoviedb_id }, (res) => {

                    var result = JSON.parse(res);
                    console.log("Called theMovieDb.movies.getById", result);
                
                    localStorage.setItem('movie-' + movie.themoviedb_id, JSON.stringify(result));

                    dispatch(actions.updateMovie(filename, result));
        
                }, (e) => {
                    console.log("Error theMovieDb getById", e);
                });
                */
            }

        }
    }

    render() {
        var movie = this.props;

        if (movie.poster) {
        
            var runtime = convertMillis(movie.duration);

            var d = new Date(movie.imdb_details.Released);

            var year = d.getFullYear();

            return (
                <div className="m-1 p-2 movie">
                    <figure className="figure">
                        <img src={movie.poster} alt="boohoo" width='300'/>
                        <figcaption className="figure-caption">{movie.title} ({year})</figcaption>
                        <figcaption className="figure-caption font-italic">{movie.imdb_details.Rated} | {runtime}</figcaption>
                        <figcaption className="figure-caption">{movie.imdb_details.Genre}</figcaption>
                    </figure>
                </div>
            )
        }
        else
            return (
                <div>
                </div>
            )
    }
}


/*
// export the connected class
function mapStateToProps(state) {
  return {
    movie: state.users,

    // https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
    // react-router-redux wants you to get the url data by passing the props through a million components instead of
    // reading it directly from the state, which is basically why you store the url data in the state (to have access to it)
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
  };
}
export default connect(mapStateToProps)(UserList);
*/

export default connect()(MovieTile)
