const Livre = require("../models/livre.model.js");
const { validationResult } = require('express-validator');

exports.findAll = (req, res) => {
  Livre.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des livres."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Livre.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Livre introuvable pour l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la récupération du livre avec l'identifiant " + req.params.id
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

  const livre = new Livre({
    titre: req.body.titre,
    nb_pages: req.body.nb_pages,
    categorie: req.body.categorie,
    id_auteur: req.body.id_auteur,
    id_couverture: req.body.id_couverture
  });

  Livre.create(livre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création du livre."
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

  Livre.updateById(
    req.params.id,
    new Livre(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Livre introuvable pour l'identifiant ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la mise à jour du livre avec l'identifiant " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Livre.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Livre introuvable pour l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Impossible de supprimer le livre avec l'identifiant " + req.params.id
        });
      }
    } else res.send({ message: `Le livre a été supprimé avec succès !` });
  });
};

exports.deleteAll = (req, res) => {
  Livre.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la suppression de tous les livres."
      });
    else res.send({ message: `Tous les livres ont été supprimés avec succès !` });
  });
};
