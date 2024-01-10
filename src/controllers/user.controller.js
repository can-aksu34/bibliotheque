const User = require("../models/user.model.js");
const { validationResult } = require('express-validator');

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des utilisateurs."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur introuvable pour l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la récupération de l'utilisateur avec l'identifiant " + req.params.id
        });
      }
    } else res.send(data);
  });
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
    password: req.body.password  // Assurez-vous que le mot de passe est haché avant de le stocker dans la base de données
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création de l'utilisateur."
      });
    else res.send(data);
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
    req.body.password,  // Assurez-vous que le nouveau mot de passe est haché avant de le stocker dans la base de données
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
      } else res.send(data);
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
