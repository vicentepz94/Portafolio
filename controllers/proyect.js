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

module.exports = {
  createProyect,
};
