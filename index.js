// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res, next) {
  // calculate date from localhost:3000/api/userinput
  let date = new Date(req.params.date);
  req.time = date;
  // if input is no date return coorect json for now()
  if (!req.params.date) {
    let nowDate = new Date();
    req.time = nowDate;
    res.json({
      unix: Number(req.time),
      utc: new Date(req.time).toUTCString(),
    });
  } // if input is not a date
  else if (date == "Invalid Date") {
    // check if input is not a unix
    let unixDate = new Date(req.params.date * 1);
    req.time = unixDate;
    // if it is not return error: Invalid Date
    if (unixDate == "Invalid Date") {
      res.json({
        error: "Invalid Date",
      });
    } // if it is return correct json for unix value
    else {
      res.json({
        unix: Number(req.time),
        utc: new Date(req.time / 1).toUTCString(),
      });
    }
  } // if input is a date return correct json
  else {
    res.json({
      unix: Number(req.time),
      utc: new Date(req.time).toUTCString(),
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
