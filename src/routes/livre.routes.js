/**
 * @swagger
 * components:
 *   schemas:
 *     Livre:
 *       type: object
 *       required:
 *         - titre
 *         - nb_pages
 *       properties:
 *         id:
 *           type: string
 *           description: L'id auto-généré du livre
 *         titre:
 *           type: string
 *           description: Le titre du livre
 *         nb_pages:
 *           type: integer
 *           description: Le nombre de pages du livre
 *       example:
 *         id: 1
 *         titre: "Titre du Livre"
 *         nb_pages: 300
 * tags:
 *   name: Livre
 *   description: The book managing API
 * /livre:
 *   get:
 *     summary: Liste des livres
 *     tags: [Livre]
 *     responses:
 *       200:
 *         description: La liste des livres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livre'
 *   post:
 *     summary: Créer un nouveau livre
 *     tags: [Livre]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livre'
 *     responses:
 *       200:
 *         description: Le livre a été créé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livre'
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer tous les livres
 *     tags: [Livre]
 *     responses:
 *       200:
 *         description: Tous les livres ont été supprimés
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livre'
 *       500:
 *         description: Erreur serveur
 * /livre/{id}:
 *   get:
 *     summary: Récupérer un livre par son id
 *     tags: [Livre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du livre
 *     responses:
 *       200:
 *         description: Le livre trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livre'
 *       404:
 *         description: Le livre n'a pas été trouvé
 *   put:
 *     summary: Mettre à jour le livre par son id
 *     tags: [Livre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du livre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livre'
 *     responses:
 *       200:
 *         description: Le livre a été mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livre'
 *       404:
 *         description: Le livre n'a pas été trouvé
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer le livre par son id
 *     tags: [Livre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du livre
 *     responses:
 *       200:
 *         description: Le livre a été supprimé
 *       404:
 *         description: Le livre n'a pas été trouvé
 */
module.exports = (app) => {
    const livre = require("../controllers/livre.controller.js");
    const { check } = require("express-validator");

    var router = require("express").Router();

    const dataChecker = [
        check("titre").isLength({ min: 2, max: 100 }),
        check("nb_pages").isInt({ min: 1 }),
        // Ajoutez d'autres validateurs pour les champs supplémentaires si nécessaire
    ];

    router.get("/", livre.findAll);
    router.get("/:id", livre.findOne);
    router.post("/", dataChecker, livre.create);
    router.put("/:id", dataChecker, livre.update);
    router.delete("/:id", livre.delete);
    router.delete("/", livre.deleteAll);

    app.use("/api/livre", router);
};
