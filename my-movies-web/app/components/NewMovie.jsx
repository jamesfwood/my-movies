import React from 'react'
import theMovieDb from 'themoviedb-javascript-library'
var {connect} = require('react-redux');
//import { withRouter } from 'react-router-dom'

import MoviesApi from 'app/api/moviesApi'
var actions = require('app/actions/');

// Find "space" character
function getSpace(str) {

    var count_dot = 0;
    var count_space = 0;
    var count_dash = 0;

    for (var i = 0; i < str.length; i++) {
        if (str[i] === '.') count_dot++;
        if (str[i] === ' ') count_space++;
        if (str[i] === '-') count_dash++;
    }

    if (count_dot > count_space && count_dot > count_dash)
        return '.';
    if (count_space > count_dot && count_space > count_dash)
        return ' ';
    if (count_dash > count_dot && count_dash > count_dot)
        return '-';
        
    return '.'
}

function convertMillis(millis) {

    var x = millis / 1000
    var seconds = Math.floor(x % 60)
    x /= 60
    var minutes = Math.floor(x % 60)
    x /= 60
    var hours = Math.floor(x)

    return hours + " hr " + minutes + " min " + seconds + " sec";
}

function findYearPosition(words) {

    for (var i = 0; i < words.length; i++) {

        var year = parseInt(words[i]);

        if (year > 1900 && year < new Date().getFullYear() + 4) {
            return { index: i, year }
        }
    }

    return { index: -1 };
}

function parseMovieFilename(filename)
{
    var title = '';

    var space = getSpace(filename);
    var words = filename.split(space);

    var yearData = findYearPosition(words);

    if (yearData.year) {
        
        for (var i = 0; i < yearData.index; i++) {
            title += words[i].trim() + ' ';
        }
    }

    title = title.trim();

    console.log("words", words);
    console.log("yearData", yearData);
    console.log("title:", title);

    return { title, year: yearData.year };
}

export class NewMovie extends React.Component {
    constructor(props) {
        super(props);

        let filename = decodeURIComponent(this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1));

        let movie = { filename };

        this.state = { movie, search: [] };
    }

    componentDidMount() {

        var self = this;

        for (var i = 0; i < this.props.movies.length; i++) {

            if (this.props.movies[i].filename === self.state.movie.filename) {

                var searchDetails = parseMovieFilename(self.state.movie.filename);

                self.updateSearch(searchDetails);

                self.setState({ movie: this.props.movies[i], search: [] });
                break;
            }
        }
    }

/*
    onChange(e) {
        this.setState( (prevState, props) => {
            var typed = '';
            if (e.target)
                typed = e.target.value;

            return { movie: prevState.movie, typed };
        });
    }
*/
    updateSearch(searchDetails) {
        
        if (searchDetails.title !== '') {
            var self = this;
            
            theMovieDb.common.api_key = process.env.TMDB_API_KEY;

            theMovieDb.search.getMovie({query: searchDetails.title, include_adult: false, year: searchDetails.year  }, (res) => {
                var result = JSON.parse(res);
                console.log("Called theMovieDb:search.getMovie", result);

                self.setState( {search: result.results});
            }, (e) => {

            });
        }
    }

    onFormSubmit(e) {
        e.preventDefault();

        this.updateSearch({ title: this.refs.title.value });
    }


  handleIgnoreClick(tmdb_id) {
      
        var self = this;

        alert("Not yet implemented");
  }


  handleAcceptClick(tmdb_id) {
      
        var self = this;
     //   var movie = this.state.movie;

        theMovieDb.movies.getById({"id": tmdb_id }, (res) => {

            var tmdb = JSON.parse(res);
            console.log("Called theMovieDb.movies.getById", tmdb);
        
           // localStorage.setItem('movie-' + movie.themoviedb_id, JSON.stringify(result));

            var imdb_id = tmdb.imdb_id.substring(2);

            MoviesApi.getImdb(imdb_id).then( movie => {

                var imdb = JSON.parse(movie[0]);


                //

                MoviesApi.updateTheMovieDbIDs(self.state.movie.filename, imdb, tmdb).then( movie => {

                    var {dispatch} = self.props;
                    dispatch(actions.updateMovie(self.state.movie.filename, imdb, tmdb));

                    self.setState( (prevState, props) => {

                        var newMovie = Object.assign({}, prevState.movie);

                        newMovie.imdb = movie.imdb;
                        newMovie.tmdb = movie.tmdb;

                        return {
                            movie: newMovie
                        }
                    });
                    
    /*
                    this.setState( (prevState, props) => {

                            return { movie: prevState.movie, typed };
                        });

            */
                }).catch ( e => {

                    console.log("error updating movie", e);
                });

            });

            
        }, (e) => {
            console.log("Error theMovieDb getById", e);
        });
    }

  render() {
      var renderSelectSearch = () => {

            if (this.state.search.length > 0)
            {
                return (
                    <h3 className="mt-5">Select The Movie To Use For This New File</h3>
                )
            }
      }

      var renderSearchImage = (search) => {

        if (search.poster_path) {
            return (
                <img className="d-flex align-self-center mr-3" src={'http://image.tmdb.org/t/p/w154/' + search.poster_path} alt="No Image" width='154'/>
            )
        }
      }

       if (this.state.movie.tmdb) {
           return (
               <div>
                <h3>{this.state.movie.filename}</h3>
                <p>Duration: {convertMillis(this.state.movie.duration)}</p>
                <p>The Movie DB ID is now: {this.state.movie.tmdb.id}</p>
                <p>IMDB ID is now: {this.state.movie.imdb.id}</p>
                </div>
           )
       }
      else if (this.state.movie.duration) {
          return (
            <div className="container">
                <h2>New Movie</h2>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <input type="text" ref="title" placeholder="Search title..."/>
                    <button>Search</button>
                </form>
                <h2>{this.state.movie.filename}</h2>
                <p>Duration: {convertMillis(this.state.movie.duration)}</p>
                <p>TODO: Display source directory name.  Will have to rebuild database again.</p>
                <button className="btn btn-outline-success" type="button" onClick={this.handleIgnoreClick.bind(this)}>Ignore</button>

                <div className="container-fluid">
                
                { renderSelectSearch() }
                
                <ul className="list-unstyled">
                  {
                    this.state.search.map( (search) =>
                    <li key={search.id} className="media my-4">
                    { renderSearchImage(search) }                       
                    <div className="media-body">
                        <h5 className="mt-0 mb-1">{search.title}</h5>
                        <p>Release Date: {search.release_date}</p>
                        <p className="mb-0">{search.overview}</p>
                        <button className="btn btn-outline-success mt-3" type="button" onClick={this.handleAcceptClick.bind(this, search.id)}>Accept</button>
                    </div>
                    </li>
                  
                    )
                  }
              </ul>
              </div>
            </div>
          )
      }
      else {
        return (
            <div>
                <h2>Loading Movie...</h2>
                <p>{this.state.movie.filename}</p>

            </div>
            )
      }
  }
}

export default connect(
    (state) => {
    return state;
  }
)(NewMovie)
