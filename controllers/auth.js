const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("../utils/jwt");

function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

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
      res.status(200).send({ msg: "Usuario creado correctamente" });
    } catch (err) {
      res.status(400).send({ msg: "Error al crear al usuario" });
      console.log("Error de servidor", err);
    }
  };
  saveUser();
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "El password es obligatorio" });

  const emailLowerCase = email.toLowerCase();

  try {
    const response = await User.findOne({ email: emailLowerCase });
    bcrypt.compare(password, response.password, (bcryptError, check) => {
      if (bcryptError) {
        res.status(500).send({ msg: "Error del servidor" });
      } else if (!check) {
        res.status(400).send({ msg: "Contraseña incorrecta" });
      } else if (!response.active) {
        res.status(400).send({ msg: "Usuario no autorizado o no activo" });
      } else {
        res.status(200).send({
          access: jwt.createAccessToken(response),
          refres: jwt.createRefreshToken(response),
        });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

module.exports = {
  register,
  login,
};
