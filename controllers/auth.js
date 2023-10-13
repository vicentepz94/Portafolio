const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("../utils/jwt");

function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "Please type an email" });
  if (!password) res.status(400).send({ msg: "Please type a password" });

  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: false,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  const saveUser = async () => {
    try {
      await user.save();
      res.status(200).send({ msg: "User created succesfully!" });
    } catch (err) {
      res
        .status(400)
        .send({
          msg: "User creation error, there is already an user with the same credentials",
        });
      console.log("Server error", err);
    }
  };
  saveUser();
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "Please type an email" });
  if (!password) res.status(400).send({ msg: "Please type a password" });

  const emailLowerCase = email.toLowerCase();

  try {
    const response = await User.findOne({ email: emailLowerCase });
    bcrypt.compare(password, response.password, (bcryptError, check) => {
      if (bcryptError) {
        res.status(500).send({ msg: "Server error" });
      } else if (!check) {
        res.status(400).send({ msg: "Wrong password" });
      } else if (!response.active) {
        res.status(400).send({ msg: "User inactive or no authorized" });
      } else {
        res.status(200).send({
          access: jwt.createAccessToken(response),
          refresh: jwt.createRefreshToken(response),
        });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
}

async function refreshAccessToken(req, res) {
  const { token } = req.body;
  try {
    if (!token) res.status(400).send({ msg: "Token required" });
    const { user_id } = jwt.decoded(token);

    const response = await User.findOne({ _id: user_id });

    res.status(200).send({
      accessToken: jwt.createAccessToken(response),
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
}

module.exports = {
  register,
  login,
  refreshAccessToken,
};
