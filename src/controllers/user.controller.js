const jwt = require('jsonwebtoken');
const User = require("../models/user.model.js");
const { validationResult } = require('express-validator');

const generateToken = (userId) => {
  
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.findAll = (req, res) => {
  // ...
};

exports.findOne = (req, res) => {
  // ...
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
  }

  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password 
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création de l'utilisateur."
      });
    else {
      const token = generateToken(data.id);
      res.send({ user: data, token });
    }
  });
};

exports.updatePassword = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
  }

  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  User.updatePassword(
    req.params.id,
    req.body.password, 
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Utilisateur introuvable pour l'identifiant ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la mise à jour du mot de passe de l'utilisateur avec l'identifiant " + req.params.id
          });
        }
      } else {
        const token = generateToken(req.params.id);
        res.send({ user: data, token });
      }
    }
  );
};

exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur introuvable pour l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Impossible de supprimer l'utilisateur avec l'identifiant " + req.params.id
        });
      }
    } else res.send({ message: `L'utilisateur a été supprimé avec succès !` });
  });
};

exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la suppression de tous les utilisateurs."
      });
    else res.send({ message: `Tous les utilisateurs ont été supprimés avec succès !` });
  });
};
