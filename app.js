const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { API_VERSION } = require("./constants");

const app = express();

//Import routing
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const postRoutes = require("./router/post");
const proyectRoutes = require("./router/proyect");

//Conf Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Conf static folder
app.use(express.static("uploads"));

//Conf Header HTTP - CORS
app.use(cors());

//Conf Routing
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);
app.use(`/api/${API_VERSION}`, proyectRoutes);

module.exports = app;
