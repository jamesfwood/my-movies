var axios = require('axios');

//const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=c4e735ea8bd7e7b6dc8368c752517b2d&units=imperial';
const MOVIES_URL = 'https://fqovjplf1b.execute-api.us-west-2.amazonaws.com/prod/movies';
const MOVIE_URL = 'https://fqovjplf1b.execute-api.us-west-2.amazonaws.com/prod/movie';

module.exports = {
  getList: function () {
//    var encodedLocation = encodeURIComponent(location);
//    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
    var requestUrl = MOVIES_URL;

    return axios.get(requestUrl).then(function (res) {

//      if (res.data.cod && res.data.Items[1].tmdb_id) {
  //      throw new Error(res.data.message);
  //    } else {
        console.log("Called MoviesApi:getList", res.data);

        return res.data;
  //    }
    }, function (res) {
      throw new Error(res.data.message);
    });
  },

  getMovie: function (filename) {
    var encFilename = encodeURIComponent(filename);
    var requestUrl = `${MOVIE_URL}/${encFilename}`;

    return axios.get(requestUrl).then(function (res) {

        console.log("Called MoviesApi:getMovie", res.data.Items);

        return res.data.Items;
    }, function (res) {
      throw new Error(res.data.message);
    });
  },

  updateTheMovieDbIDs: function(filename, imdb_id, tmdb_id) {

      var requestUrl = MOVIE_URL;

      var body = {
        filename,
        imdb_id,
        tmdb_id
      };

      return axios.put(requestUrl, body).then( res => {
            return res.data;
        }).catch(e => {
          throw new Error(e.data.message);
        });
  }
}
