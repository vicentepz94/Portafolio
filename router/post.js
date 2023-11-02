const express = require("express");
const multiparty = require("connect-multiparty");
const PostController = require("../controllers/post");
const md_auth = require("../middleware/authenticate");

const md_upload = multiparty({ uploadDir: "./uploads/post" });
const api = express.Router();

api.post("/post", [md_auth.asureAuth, md_upload], PostController.createPost);
api.get("/post", PostController.getAllPosts);
api.get("/post/:path", PostController.getPost);
api.patch("/post/:id", [md_auth.asureAuth, md_upload], PostController.editPost);
api.delete("/post/:id", [md_auth.asureAuth], PostController.deletePost);

module.exports = api;
