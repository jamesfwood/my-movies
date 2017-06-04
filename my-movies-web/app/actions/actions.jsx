

export var addMovies = (movies) => {
  return {
    type: 'ADD_MOVIES',
    movies
  };
};

export var sortBy = (text) => {
    return {
        type: 'SORT_BY',
        text
    }
}

export var toggleOrderBy = () => {
 return {
        type: 'TOGGLE_ORDER_BY'
    }
}

export var toggleWatched = () => {
    return {
        type: 'TOGGLE_WATCHED'
    }
}

export var updateMovie = (filename, imdb_details) => {
    return {
        type: 'UPDATE_MOVIE',
        filename,
        imdb_details
    }
}