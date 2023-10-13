const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    res
      .status(403)
      .send({ msg: "The request doesn't have an authentication header" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const payload = jwt.decoded(token);

    const { exp } = payload;
    const currentDate = new Date().getTime();

    if (exp <= currentDate) {
      return res.status(400).send({ msg: "The token has expired" });
    }
    //usuario a enviar para el middleware
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send({ msg: "Invalid token" });
  }
}

module.exports = {
  asureAuth,
};
