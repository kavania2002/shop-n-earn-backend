const dotenv = require("dotenv");
dotenv.config();

require('./config/database').connect();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// configuring the bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// adding the cors to make it accessible
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.listen(process.env.PORT || 2300, (err) => {
  if (err) console.log(err);
  else console.log("Server is up");
});
