const express = require("express");
const bodyParser = require("body-parser");
const { API_VERSION } = require("./config");
//Import the routes
const userRoutes = require("./routes/user");
const tokenRoute = require("./routes/authToken");
const clientRoutes = require("./routes/clients");

const app = express();

//Middlewares

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Configure Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Use all the routes defined in routes
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, tokenRoute);
app.use(`/api/${API_VERSION}`, clientRoutes);

module.exports = app;
