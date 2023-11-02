const { response } = require("express");
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

async function getAllPosts(req, res) {
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

async function getPost(req, res) {
  const { path } = req.params;

  try {
    const response = await Post.findOne({ path });

    res.status(200).send(response);
  } catch (error) {
    if (error) {
      res.status(500).send({ msg: "Server error!" });
    } else if (!response) {
      res.status(400).send({ msg: "Post not found!" });
    }
  }
}

async function editPost(req, res) {
  const { id } = req.params;
  const projectData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    projectData.miniature = imagePath;
  }

  const response = await Post.findByIdAndUpdate({ _id: id }, projectData);
  if (!response) {
    res.status(400).send({ msg: "There was an error editing the posts" });
  } else {
    res.status(200).send({ msg: "The post was edited" });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const response = await Post.findByIdAndDelete(id);
    if (response) {
      res.status(200).send({ msg: "The post has been deleted!" });
    }
  } catch (error) {
    res.status(400).send({ msg: "There was an error deleting the post" });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  editPost,
  getPost,
  deletePost,
};
