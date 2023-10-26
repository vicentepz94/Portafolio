const Post = require("../model/post");
const image = require("../utils/image.js");

async function createPost(req, res) {
  const post = new Post(req.body);
  post.created_at = new Date();

  const imagePath = image.getFilePath(req.files.miniature);
  post.miniature = imagePath;

  try {
    const result = await post.save();
    res.status(201).send(result);
  } catch (error) {
    res
      .status(400)
      .send({ msg: "An error has ocurred while creating the post" });
  }
}

async function getPost(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: "desc" },
  };

  Post.paginate({}, options, (error, postStored) => {
    if (error) {
      res.status(400).send({ msg: "There was an error obtaining the posts" });
    } else {
      res.status(200).send(postStored);
    }
  });
}

module.exports = {
  createPost,
  getPost,
};
