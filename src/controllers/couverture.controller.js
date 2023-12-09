const Couverture = require("../models/couverture.model.js");
const { validationResult } = require('express-validator');

exports.findAll = (req, res) => {
  Couverture.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des couvertures."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Couverture.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Couverture introuvable pour l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la récupération de la couverture avec l'identifiant " + req.params.id
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

  const couverture = new Couverture({
    nom: req.body.nom,
    description: req.body.description
  });

  Couverture.create(couverture, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création de la couverture."
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

  Couverture.updateById(
    req.params.id,
    new Couverture(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Couverture introuvable pour l'identifiant ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la mise à jour de la couverture avec l'identifiant " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Couverture.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Couverture introuvable pour l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Impossible de supprimer la couverture avec l'identifiant " + req.params.id
        });
      }
    } else res.send({ message: `La couverture a été supprimée avec succès !` });
  });
};

exports.deleteAll = (req, res) => {
  Couverture.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la suppression de toutes les couvertures."
      });
    else res.send({ message: `Toutes les couvertures ont été supprimées avec succès !` });
  });
};
