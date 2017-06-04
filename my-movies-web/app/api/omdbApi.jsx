var axios = require('axios');

const OMDBAPI_URL = 'http://www.omdbapi.com/?i=';

module.exports = {

  getMovie: function(imdb_id) {

    var requestUrl = `${OMDBAPI_URL}${imdb_id}`;

    return axios.get(requestUrl).then(function (res) {

        console.log("Called omdbAPI:getMovie", res);

        return res.data;

    }, function (res) {
      throw new Error(res.data.message);
    });
  }
}

