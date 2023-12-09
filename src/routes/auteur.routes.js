/**
 * @swagger
 * tags:
 *   name: Auteur
 *   description: The auteur managing API
 * components:
 *   schemas:
 *     Auteur:
 *       type: object
 *       required:
 *         - nom
 *       properties:
 *         id:
 *           type: string
 *           description: L'id auto-généré de l'auteur
 *         nom:
 *           type: string
 *           description: Le nom de l'auteur
 *         prenom:
 *           type: string
 *           description: Le prénom de l'auteur
 *       example:
 *         id: 1
 *         nom: Doe
 *         prenom: John
 * /auteur:
 *   get:
 *     summary: Liste des auteurs
 *     tags: [Auteur]
 *     responses:
 *       200:
 *         description: La liste des auteurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auteur'
 *   post:
 *     summary: Créer un nouvel auteur
 *     tags: [Auteur]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auteur'
 *     responses:
 *       200:
 *         description: L'auteur a été créé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auteur'
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer tous les auteurs
 *     tags: [Auteur]
 *     responses:
 *       200:
 *         description: Tous les auteurs ont été supprimés
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auteur'
 *       500:
 *         description: Erreur serveur
 * /auteur/{id}:
 *   get:
 *     summary: Récupérer un auteur par son id
 *     tags: [Auteur]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de l'auteur
 *     responses:
 *       200:
 *         description: L'auteur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auteur'
 *       404:
 *         description: L'auteur n'a pas été trouvé
 *   put:
 *     summary: Mettre à jour l'auteur par son id
 *     tags: [Auteur]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de l'auteur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auteur'
 *     responses:
 *       200:
 *         description: L'auteur a été mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auteur'
 *       404:
 *         description: L'auteur n'a pas été trouvé
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer l'auteur par son id
 *     tags: [Auteur]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id de l'auteur
 *     responses:
 *       200:
 *         description: L'auteur a été supprimé
 *       404:
 *         description: L'auteur n'a pas été trouvé
 */


module.exports = app => {
    const auteur = require("../controllers/auteur.controller.js");
    const { check } = require('express-validator');
    
    var router = require("express").Router();
  
    const dataChecker = [check('nom').isLength({ min: 2, max: 20 }), check('prenom').isLength({ max: 40 })]
    router.get("/", auteur.findAll);
    router.get("/:id", auteur.findOne);
    router.post("/", dataChecker, auteur.create);
    router.put("/:id", dataChecker, auteur.update);
    router.delete("/:id", auteur.delete);
    router.delete("/", auteur.deleteAll);
    
  
    app.use('/api/auteur', router);
  };
  