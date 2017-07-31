

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

export var setRuntimeRange = (runtimeRange) => {

    return {
        type: 'SET_RUNTIME_RANGE',
        runtimeRange
    }
}

export var toggleWatched = () => {
    return {
        type: 'TOGGLE_WATCHED'
    }
}

export var updateGenres = (genres) => {
    return {
        type: 'UPDATE_GENRES',
        genres
    }
}

export var updateGenre = (genre, doAdd) => {
    return {
        type: 'UPDATE_GENRE',
        genre,
        doAdd
    }
}

export var updateMovie = (filename, imdb, tmdb) => {
    return {
        type: 'UPDATE_MOVIE',
        filename,
        imdb,
        tmdb
    }
}