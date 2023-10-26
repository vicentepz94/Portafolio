const express = require("express");
const multiparty = require("connect-multiparty");
const ProyectController = require("../controllers/proyect");
const md_auth = require("../middleware/authenticate");

const md_upload = multiparty({ uploadDir: "./uploads/proyect" });
const api = express.Router();

api.post(
  "/proyect",
  [md_auth.asureAuth, md_upload],
  ProyectController.createProyect
);

module.exports = api;
