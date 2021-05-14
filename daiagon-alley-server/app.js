/* Entry point for the Server. Configures the application and starts
the server */
require("dotenv").config();
var express = require("express");
const cors = require("cors");
var createError = require("http-errors");
var path = require("path");
let client = require("./db"); //database instance
const port = process.env.PORT || 5000;

var app = express();
//Enable cross origin requests so that react can call express backend
app.use(cors());

var dsrRouter = require("./routes/dsr");
var aaveRouter = require("./routes/aave");
var compoundRouter = require("./routes/compound");
var ratesRouter = require("./routes/rates");
const { Server } = require("http");

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Initialize base url for express routes
app.use("/dsr", dsrRouter);
app.use("/aave", aaveRouter);
app.use("/compound", compoundRouter);
app.use("/rates", ratesRouter);

//Instantiate a postgres pool instance to use for queries
client.connect((err) => {
  if (err) {
    console.log("Unable to connect to Postgres.");
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

/* 
Error handler
Can be used with next() call in endpoints */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`< !DOCTYPE HTML>
  <html>
  <head>
  <meta charset="utf-8"/>
  <title>${err.status}</title>
  </head>
  <body>
  <h2>${err.status}</h2>
  <p>${err.message} </p>
  </body>
  </html>`);
});

module.exports = app;
