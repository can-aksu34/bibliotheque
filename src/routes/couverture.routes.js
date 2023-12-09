module.exports = (app) => {
    const couverture = require("../controllers/couverture.controller.js");
    const { check } = require("express-validator");

    var router = require("express").Router();

    const dataChecker = [
        check("nom").isLength({ min: 2, max: 20 }),
        check("description").isLength({ min: 2, max: 255 })
    ];

    router.get("/", couverture.findAll);
    router.get("/:id", couverture.findOne);
    router.post("/", dataChecker, couverture.create);
    router.put("/:id", dataChecker, couverture.update);
    router.delete("/:id", couverture.delete);
    router.delete("/", couverture.deleteAll);

    app.use("/api/couverture", router);
};
