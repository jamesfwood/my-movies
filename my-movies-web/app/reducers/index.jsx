import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

var filterDefault = {
    sortBy: 'title',    // title, runtime, rating, releaseDate, Genre, imdbRating, tmdbRating, rottenTomatoesRating, budget, revenue
    orderBy: 'asc',     // asc, desc
    showWatched: false
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


var filtersReducer = (state = filterDefault, action) => {
    switch (action.type) {
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
                    imdb_details: action.imdb_details,
                    title: action.imdb_details.Title,
                    poster: action.imdb_details.Poster
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
