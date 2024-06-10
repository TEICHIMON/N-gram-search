// server.js
// where your node app starts

// init project
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes");
const port = process.env.PORT || 3000;
const createError = require("http-errors");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(express.static("public"));

app.use("/api", routes);



app.use(express.static(path.join(__dirname, "../frontend/dist")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

module.exports = app;
