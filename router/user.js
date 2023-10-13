const express = require("express");
const md_auth = require("../middleware/authenticate");
const UserController = require("../controllers/user");

const api = express.Router();

api.get("/user/me", [md_auth.asureAuth], UserController.getMe);

module.exports = api;
