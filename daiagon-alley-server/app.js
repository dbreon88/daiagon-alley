require("dotenv").config();
var express = require("express");
var path = require("path");
let client = require("./db");
const port = process.env.PORT || 5000;

var app = express();

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const dbOptions = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
};

client.connect((err) => {
  if (err) {
    console.log("Unable to connect to Postgres.");
    process.exit(1);
  } else {
    app.listen(5000, () => {
      console.log("Listening on port 5000...");
    });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
