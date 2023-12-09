const Auteur = require("../models/auteur.model.js");
const { validationResult } = require('express-validator');

exports.findAll = (req, res) => {
  const title = req.query.title;

  Auteur.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des auteurs."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Auteur.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Auteur introuvable pour l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la récupération de l'auteur avec l'identifiant " + req.params.id
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

  const auteur = new Auteur({
    nom: req.body.nom,
    prenom: req.body.prenom
  });

  Auteur.create(auteur, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création de l'auteur."
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

  Auteur.updateById(
    req.params.id,
    new Auteur(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Auteur introuvable pour l'identifiant ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la mise à jour de l'auteur avec l'identifiant " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Auteur.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Auteur introuvable pour l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Impossible de supprimer l'auteur avec l'identifiant " + req.params.id
        });
      }
    } else res.send({ message: `L'auteur a été supprimé avec succès !` });
  });
};

exports.deleteAll = (req, res) => {
  Auteur.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la suppression de tous les auteurs."
      });
    else res.send({ message: `Tous les auteurs ont été supprimés avec succès !` });
  });
};
