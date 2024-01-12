
const { validationResult } = require("express-validator");

const checkRequestBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Le contenu ne peut pas être vide !" });
  }
  next();
};

module.exports = {
  checkRequestBody
};
