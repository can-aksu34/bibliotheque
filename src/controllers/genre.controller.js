const Genre = require("../models/genre.model.js");
const { validationResult } = require('express-validator');

exports.findAll = (req, res) => {
  Genre.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des genres."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Genre.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Genre introuvable pour l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la récupération du genre avec l'identifiant " + req.params.id
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

  const genre = new Genre({
    nom: req.body.nom
  });

  Genre.create(genre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création du genre."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
  }

  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  Genre.updateById(
    req.params.id,
    new Genre(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Genre introuvable pour l'identifiant ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la mise à jour du genre avec l'identifiant " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Genre.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Genre introuvable pour l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Impossible de supprimer le genre avec l'identifiant " + req.params.id
        });
      }
    } else res.send({ message: `Le genre a été supprimé avec succès !` });
  });
};

exports.deleteAll = (req, res) => {
  Genre.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la suppression de tous les genres."
      });
    else res.send({ message: `Tous les genres ont été supprimés avec succès !` });
  });
};
