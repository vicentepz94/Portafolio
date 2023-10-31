const express = require("express");
const multiparty = require("connect-multiparty");
const ProjectController = require("../controllers/project");
const md_auth = require("../middleware/authenticate");

const md_upload = multiparty({ uploadDir: "./uploads/project" });
const api = express.Router();

api.post(
  "/project",
  [md_auth.asureAuth, md_upload],
  ProjectController.createProject
);
api.get("/project", ProjectController.getAllProjects);
api.patch(
  "/project/:id",
  [md_auth.asureAuth, md_upload],
  ProjectController.updateProject
);
api.delete(
  "/project/:id",
  [md_auth.asureAuth],
  ProjectController.deteleProject
);
api.get("/project/:path", ProjectController.getProject);

module.exports = api;
