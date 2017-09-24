// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var Bing = require('node-bing-api')({"accKey": 'x1kE54sILOhbBK8+HS3uHc010M+A1euytKKbKkuTzN0'});
var util = require('util');
var searchBing = util.promisify(Bing.web.bind(Bing));
// var url = require('url');

//var search = new Search('x1kE54sILOhbBK8+HS3uHc010M+A1euytKKbKkuTzN0');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/imagesearch/:image_type", function (request, response) {
  var query = request.params["image_type"];
  var count = request.params["offset"]
  // var body  = url.parse(request.body);
  response.json({"image type ": query, "offset": request.query});
  // Bing.images(query, {count: 10}, function(err, result){
  //   response.send(result);
  // });
  
});

app.get("/api/history", function (request, response) {
  // search from db and then return the latest image search
  //response.send(dreams);
});


// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
