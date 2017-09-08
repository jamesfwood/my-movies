var express = require('express');
var PythonShell = require('python-shell');

// Create our app
var app = express();

app.use(express.static('public'));

app.listen(8080, function () {
  console.log('Express server is up on port 8080');
});


app.get('/imdb', imdb_search);

function imdb_search(req, res) {
  var options = {
    mode: 'text',
    pythonPath: 'C:\\Python27\\python',
    pythonOptions: ['-u'],
 //   scriptPath: 'E:\\Documents\\My Projects\\my-movies\\my-movies-web',
    args: [ req.query.id ]
  };

  console.log('Im starting my search now!');

// using spawn instead of exec, prefer a stream over a buffer
  // to avoid maxBuffer issue
 /* var spawn = require("child_process").spawn;
  var process = spawn('C:\\Python27\\python', ["./search_imdb.py",
     req.query.id // number of simulations
  ]);

  process.stdout.on('data', function (data) {
    res.send(data.toString());
  });
*/
  PythonShell.run('./search_imdb.py', options, function (err, data) {

    console.log('error', err);

    if (err) res.send(err);

    console.log('data', data);

    //json = JSON.stringify(data);
    //json.replace("/r", "");
    res.setHeader('Content-Type', 'application/json');
    res.send(data);

    //console.log('json', json);
  });

  
}