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
