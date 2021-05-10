require("dotenv").config();
var express = require("express");
var path = require("path");
//var logger = require("morgan");
const port = process.env.PORT || 5000;

var app = express();

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.send("Hello World");
});

// change this to postgres
// client.connect("mongodb://localhost:27017/", (err) => {
//   if (err) {
//     console.log("Unable to connect to Mongo.");
//     process.exit(1);
//   } else {
//     app.listen(3000, () => {
//       console.log("Listening on port 3000...");
//     });
//   }
// });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
