var axios = require('axios');

const MOVIES_URL = 'https://fqovjplf1b.execute-api.us-west-2.amazonaws.com/prod/movies';

const THE_MOVIES_DB_URL = 'https://api.themoviedb.org/3/configuration?api_key=';

const IMAGES_URL = 'http://image.tmdb.org/t/p/w500/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg';



module.exports = {

  NOTUSING___getImageBaseUrl: function() {

    return axios.get(THE_MOVIES_DB_URL).then(function (res) {

      if (res.data.cod && res.data.Items[1].tmdb_id) {
        throw new Error(res.data.message);
      } else {
        return res.data.images.base_url;
      }
    }, function (res) {
      throw new Error(res.data.message);
    });
  },

  NOTUSING___getTemp: function (location) {
//    var encodedLocation = encodeURIComponent(location);
//    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
    var requestUrl = THE_MOVIES_DB_URL;

    return axios.get(requestUrl).then(function (res) {

      if (res.data.cod && res.data.Items[1].tmdb_id) {
        throw new Error(res.data.message);
      } else {
        return res.data.Items[1].tmdb_id;
      }
    }, function (res) {
      throw new Error(res.data.message);
    });
  }
}

