// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var Bing = require('node-bing-api')({accKey: "3b305717f96646a1ab00ecdf7e2fe003"});
var mongodb = require('mongodb');
                                    // "rootUri": "https://api.cognitive.microsoft.com/bing/v7.0/images?"});

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
  var offset = request.query["offset"] || 1;
  
  Bing.images(query, 
              {top: offset, market: "en-US"}, 
              function(err, res, result){
                if(err){
                  response.json(err);
                }
                else{
                   // response.json({"url": result.queryExpansions[0]});
                  var obj = [];
                  for(var res in result.queryExpansions)
                    {
                      obj.push({"text": result.queryExpansions[res]["text"],
                                 "Display-Text": result.queryExpansions[res]["displayText"],
                                 "url": result.queryExpansions[res]["thumbnail"]["thumbnailUrl"]});      
                    }
                    response.json(obj);
                }
              });  
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
