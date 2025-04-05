// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  //check input for unix
  let userDate;
  const unixRegex = /^[0-9]+$/
  if (unixRegex.test(req.params.date)) {
    //if unix
    userDate = new Date(parseInt(req.params.date))
  } else if (!req.params.date) {
    userDate = new Date();
  } else {
    //Parse date
    userDate = new Date(req.params.date);
  };
  
  //format for two date keys
  var UTCDate = userDate.toUTCString();
  var unixDate = userDate.getTime();
  //respond with date values or invalid date
  if (!unixDate){
    res.json({ error: "Invalid Date" })
  } else {
  res.json({unix: unixDate, utc: UTCDate});
  };
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
