import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

const genres = [ 'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
                'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History',
                'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi',
                'Sport', 'Thriller', 'War', 'Western' ]

var filterDefault = {
    sortBy: 'title',    // title, runtime, rating, releaseDate, Genre, imdbRating, tmdbRating, rottenTomatoesRating, budget, revenue
    orderBy: 'asc',     // asc, desc
    runtimeRange: [50, 500],
    showWatched: false,
    genres
}

// Filters:
// title search bar
// runtime (min, max, slider bar)
// rating (multi-select from R, PG, PG-13, NC-17, etc...)
// releaseDate (start date, end date (or no end date)  Date pickers)
// genre (multi-select from Action, Drama, Documentary, etc...)
// imdbRating (min, slider bar)
// rottenTomatoesRating (min, slider bar)
// theMovieDbRating (min, slider bar)
// budget (min, max?)  Blockbuster movies, etc...
// revenue (min)  Big hits
// revenue / budget  Big suprise hits
// actors


var filtersReducer = (state = filterDefault, action) => {
    switch (action.type) {
        case 'SET_RUNTIME_RANGE':
            return {
                ...state,
                runtimeRange: action.runtimeRange
            }
        case 'SORT_BY':
            return {
                ...state,
                sortBy: action.text
            }
        case 'TOGGLE_WATCHED':
            return {
                ...state,
                showWatched: !state.showWatched
            }
        case 'TOGGLE_ORDER_BY':
            return {
                ...state,
                orderBy: state.orderBy === 'asc' ? 'desc' : 'asc'
            }
        case 'UPDATE_GENRES':
            return {
                ...state,
                genres: action.genres
            }
        case 'UPDATE_GENRE':

            var genres = state.genres.slice();

            if (action.doAdd) {
                if (genres.indexOf(action.genre) === -1) {
                    genres.push(action.genre);
                }
            }
            else {
                // remove
                var i = genres.indexOf(action.genre);
                if (i !== -1) {
                    genres.splice(i, 1);
                }
            }

            return {
                ...state,
                genres
            }
        default:
            return state;
    }
};

var moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIES':
      return [
        ...state,
        ...action.movies
      ];
    case 'UPDATE_MOVIE':
        return state.map((movie) => {
            if (movie.filename === action.filename) {

                return {
                    ...movie,
                    imdb: action.imdb,
                    tmdb: action.tmdb
                }
            }
            else {
                return movie;
            }
        });
    default:
      return state;
  }
};

//import {searchTextReducer, showCompletedReducer, todosReducer, authReducer} from 'reducers'

// main reducers
export const reducers = combineReducers({
    routing: routerReducer,
    movies: moviesReducer,
    filters: filtersReducer,
    form: formReducer, // mounted under "form"
  });
