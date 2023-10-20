const User = require("../model/user");
const image = require("../utils/image");
const bcrypt = require("bcryptjs");

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "User not found" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;

  if (active == undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: false });
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    user.avatar = imagePath;
  }

  try {
    const response = await user.save();
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Couldn't create user" });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  // Password
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  // Avatar
  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  const response = await User.findByIdAndUpdate({ _id: id }, userData);
  if (!response) {
    res.status(400).send({ msg: "User update error" });
  } else {
    res.status(200).send({ msg: "User updated" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const response = await User.findByIdAndDelete(id);
  if (!response) {
    res.status(400).send({ msg: "User couldn't be deleted" });
  } else {
    res.status(200).send({ msg: "User deleted" });
  }
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
