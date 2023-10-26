const Proyect = require("../model/proyect");
const image = require("../utils/image");

async function createProyect(req, res) {
  const proyect = new Proyect(req.body);
  proyect.created_at = new Date();

  const imagePath = image.getFilePath(req.files.miniature);
  proyect.miniature = imagePath;

  try {
    const result = await proyect.save();
    res.status(201).send(result);
  } catch (error) {
    res
      .status(400)
      .send({ msg: "An error has ocurred while creating the proyect" });
  }
}

async function getProyect(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: "desc" },
  };

  Proyect.paginate({}, options, (error, postStored) => {
    if (error) {
      res
        .status(400)
        .send({ msg: "There was an error obtaining the projects" });
    } else {
      res.status(200).send(postStored);
    }
  });
}

module.exports = {
  createProyect,
  getProyect,
};
