const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { API_VERSION } = require("./constants");

const app = express();

//Import routing
const authRoutes = require("./router/auth");

//Conf Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Conf static folder
app.use(express.static("uploads"));

//Conf Header HTTP - CORS
app.use(cors());

//Conf Routing
app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;
