require("dotenv").config();
var express = require("express");
var createError = require("http-errors");
var path = require("path");
let client = require("./db");
const port = process.env.PORT || 5000;

var dsrRouter = require("./routes/dsr");

var app = express();

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// const dbOptions = {
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: 5432,
// };

app.use("/dsr", dsrRouter);

app.get("/", (req, res, next) => {
  client.query(
    "CREATE TEMP TABLE IF NOT EXISTS table_test(pk SERIAL PRIMARY KEY);",
    (err, result) => {
      if (err) {
        console.log("ERROR WITH POSTGRES QUERY: ", err.message);
        next(err);
      }
      res.send(result);
    }
  );
});

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

// error handler
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
  <h1>${err.status}</h1>
  <p>${err.message} </p>
  </body>
  </html>`);
});

module.exports = app;
