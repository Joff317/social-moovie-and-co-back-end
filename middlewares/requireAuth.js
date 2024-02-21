const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const requireAuth = (req, res, next) => {
  // 1. Extraction du tokent JWT de l'en-tête de la requête :
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "Vous devez être loggé." });
  }

  // 2. Vérifier le token
  const token = authorization.replace("Bearer ", ""); // Token extrait du "Bearer" si présent

  jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
    if (err) {
      res.status(401).json({ error: "Vous devez être loggé." });
    }

    console.log(payload);
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;

    next();
  });
};

module.exports = requireAuth
