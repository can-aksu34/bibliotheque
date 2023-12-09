/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - nom
 *       properties:
 *         id:
 *           type: string
 *           description: L'id auto-généré du genre
 *         nom:
 *           type: string
 *           description: Le nom du genre
 *       example:
 *         id: 1
 *         nom: Fiction
 * tags:
 *   name: Genre
 *   description: The genre managing API
 * /genre:
 *   get:
 *     summary: Liste des genres
 *     tags: [Genre]
 *     responses:
 *       200:
 *         description: La liste des genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *   post:
 *     summary: Créer un nouveau genre
 *     tags: [Genre]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: Le genre a été créé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer tous les genres
 *     tags: [Genre]
 *     responses:
 *       200:
 *         description: Tous les genres ont été supprimés
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       500:
 *         description: Erreur serveur
 * /genre/{id}:
 *   get:
 *     summary: Récupérer un genre par son id
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du genre
 *     responses:
 *       200:
 *         description: Le genre trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Le genre n'a pas été trouvé
 *   put:
 *    summary: Mettre à jour le genre par son id
 *    tags: [Genre]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: L'id du genre
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Genre'
 *    responses:
 *      200:
 *        description: Le genre a été mis à jour
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Genre'
 *      404:
 *        description: Le genre n'a pas été trouvé
 *      500:
 *        description: Erreur serveur
 *   delete:
 *     summary: Supprimer le genre par son id
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id du genre
 *     responses:
 *       200:
 *         description: Le genre a été supprimé
 *       404:
 *         description: Le genre n'a pas été trouvé
 */

module.exports = (app) => {
    const genre = require("../controllers/genre.controller.js");
    const { check } = require("express-validator");

    var router = require("express").Router();

    const dataChecker = [check("nom").isLength({ min: 2, max: 20 })];

    router.get("/", genre.findAll);
    router.get("/:id", genre.findOne);
    router.post("/", dataChecker, genre.create);
    router.put("/:id", dataChecker, genre.update);
    router.delete("/:id", genre.delete);
    router.delete("/", genre.deleteAll);

    app.use("/api/genre", router);
};