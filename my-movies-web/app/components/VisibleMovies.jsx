import { connect } from 'react-redux'
//import { toggleTodo } from '../actions'
import Movies from 'app/components/Movies'




// TODO: Add Move Rating pic instead of just the letters.  

    function sortReleaseDateAsc(a, b) {
    //  if (!a.duration || !b.duration || a.duration === b.duration)
     //     return 0;

      return (new Date(a.tmdb.release_date).getTime()) - (new Date(b.tmdb.release_date).getTime());
    }
    function sortReleaseDateDesc(a, b) {
    //  if (!a.duration || !b.duration || a.duration === b.duration)
     //     return 0;

      return (new Date(b.tmdb.release_date)).getTime() - (new Date(a.tmdb.release_date)).getTime();
    }

    function sortImdbRatingAsc(a, b) {
    //  if (!a.duration || !b.duration || a.duration === b.duration)
     //     return 0;

      return a.imdb.rating - b.imdb.rating;
    }
    function sortImdbRatingDesc(a, b) {
    //  if (!a.duration || !b.duration || a.duration === b.duration)
     //     return 0;

      return b.imdb.rating - a.imdb.rating;
    }

    function sortBudgetAsc(a, b) {
      return a.tmdb.budget - b.tmdb.budget;
    }
    function sortBudgetDesc(a, b) {
      return b.tmdb.budget - a.tmdb.budget;
    }

    function sortDurationAsc(a, b) {
    //  if (!a.duration || !b.duration || a.duration === b.duration)
     //     return 0;

      return a.duration - b.duration;
    }

    function sortDurationDesc(a, b) {
    //  if (!a.duration || !b.duration || a.duration === b.duration)
     //     return 0;

      return b.duration - a.duration;
    }

    function sortTitleAsc(a, b)  {

        if (a.imdb.title === b.imdb.title)
            return a.imdb.year - b.imdb.year;

        return a.imdb.title.toLowerCase() < b.imdb.title.toLowerCase() ? -1 : 1;
    }
    function sortTitleDesc(a, b)  {

        if (a.imdb.title === b.imdb.title)
            return b.imdb.year - a.imdb.year;

        return b.imdb.title.toLowerCase() < a.imdb.title.toLowerCase() ? -1 : 1;
    }

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

//TODO: Look up redux shopping cart example
// TODO: Use selectors:  reactjs / reselect


    //      var filteredList = movies;

    /*      if (!filters.showWatched) {
            filteredList = filteredList.filter( (movie) => {
                return !movie.watched;
              });
          }

        console.log("Movies componentDidMount.  filteredList Movie count", filteredList.length);
        console.log("filters.showWatched", filters.showWatched);
          
 */
//         var width = (this.state.viewportWidth - 20) / 3;



const getVisibleMovies = (movies, filters) => {

    let movieList = movies.filter(m => m.imdb);

    movieList = movieList.filter(m => (m.duration / 1000 / 60) >= filters.runtimeRange[0]);
    movieList = movieList.filter(m => (m.duration / 1000 / 60) <= filters.runtimeRange[1]);
    
    movieList = movieList.filter(m => {
        for (var g of filters.genres) {
            for (var mg of m.imdb.genres) {
                if (g === mg) {
                    return true;
                }
            }
        }
     //   for (var i = 0; i < filters.genres.length; i++) {
     //       for (var j = 0; j < m.imdb.genres.length; j++) {
     //           if (m.imdb.genres[j] === filters.genres[i])
      //              return true;
      //      }
     //   }
    });

    //var movies2 = Object.assign({}, movies);

    if (!filters.showWatched)
        movieList = movieList.filter(m => !m.watched);

    let sortfunc = sortTitleAsc;

    switch (filters.sortBy) {
        case 'title':
            console.log("sortby title");
            sortfunc = filters.orderBy === 'asc' ? sortTitleAsc : sortTitleDesc;
            break;

        case 'runtime':
            console.log("sortby runtime");
            sortfunc = filters.orderBy === 'asc' ? sortDurationAsc : sortDurationDesc;
            break;

        case 'imdbRating':
            console.log("sortby imdbRating");
            sortfunc = filters.orderBy === 'asc' ? sortImdbRatingAsc : sortImdbRatingDesc;
            break;

        case 'releaseDate':
            console.log("sortby releaseDate");
            sortfunc = filters.orderBy === 'asc' ? sortReleaseDateAsc : sortReleaseDateDesc;
            break;

        case 'budget':
            console.log("sortby budget");
            sortfunc = filters.orderBy === 'asc' ? sortBudgetAsc : sortBudgetDesc;
            break;

        default:

    }

    return movieList.sort( sortfunc );

  //  var movies2 = movies.sort( sortfunc );

   /* if (!filters.showWatched) {
        return movies.filter( (movie) => {
            return !movie.watched;
        });
    }
*/
    //return movies2;
     //   console.log("Movies componentDidMount.  filteredList Movie count", filteredList.length);
     //   console.log("filters.showWatched", filters.showWatched);
  
  /*switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }*/
}

const mapStateToProps = state => {
  return {
    movies: getVisibleMovies(state.movies, state.filters)
  }
}
/*
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}
*/
const VisibleMovies = connect(
  mapStateToProps//,
  //mapDispatchToProps
)(Movies)

export default VisibleMovies
