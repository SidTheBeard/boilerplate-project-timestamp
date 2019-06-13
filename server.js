// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date_string?', (req, res, next) => {
  console.log("REQ:", req.params);
  let stringParsed = req.params.date_string.replace(/\-+/g, "/");
  req.timestamp = new Date(( stringParsed.indexOf("/") >= 0 ? stringParsed : +(stringParsed)));
  if( req.timestamp == "Invalid Date" ) {
    res.json({ unix: null, utc: "Invalid Date" });
  } else {
    next();
  }
}, (req, res) => {
  let toReturn = { unix: req.timestamp.getTime(), date: req.timestamp };
  res.json(toReturn);
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
