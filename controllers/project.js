const { response } = require("express");
const Project = require("../model/project");
const image = require("../utils/image");

async function createProject(req, res) {
  const project = new Project(req.body);
  project.created_at = new Date();

  const imagePath = image.getFilePath(req.files.miniature);
  project.miniature = imagePath;

  try {
    const result = await project.save();
    res.status(201).send(result);
  } catch (error) {
    res
      .status(400)
      .send({ msg: "An error has ocurred while creating the project" });
  }
}

async function getAllProjects(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: "desc" },
  };

  Project.paginate({}, options, (error, projectStored) => {
    if (error) {
      res
        .status(400)
        .send({ msg: "There was an error obtaining the projects" });
    } else {
      res.status(200).send(projectStored);
    }
  });
}

async function getProject(req, res) {
  const { path } = req.params;

  try {
    const response = await Project.findOne({ path });

    res.status(200).send(response);
  } catch (error) {
    if (error) {
      res.status(500).send({ msg: "Server error" });
    } else if (!response) {
      res.status(400).send({ msg: "Project not found" });
    }
  }
}

async function updateProject(req, res) {
  const { id } = req.params;
  const projectData = req.body;

  // Miniature
  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    projectData.miniature = imagePath;
  }

  const response = await Project.findByIdAndUpdate({ _id: id }, projectData);
  if (!response) {
    res.status(400).send({ msg: "Project update error" });
  } else {
    res.status(200).send({ msg: "Project updated!" });
  }
}

async function deteleProject(req, res) {
  const { id } = req.params;
  const response = await Project.findByIdAndDelete(id);
  if (!response) {
    res.status(400).send({ msg: "Project deletion error" });
  } else {
    res.status(200).send({ msg: "The project has been deleted!" });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deteleProject,
};
