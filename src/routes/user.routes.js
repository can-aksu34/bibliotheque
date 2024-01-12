// user.routes.js
const authMiddleware = require('../middlewares/authMiddleware');
module.exports = (app) => {
    const user = require("../controllers/user.controller.js");
    const { check } = require("express-validator");
  
    var router = require("express").Router();
  
    // Validation des données pour l'enregistrement d'un nouvel utilisateur
    const registrationDataChecker = [
      check("username").isLength({ min: 5, max: 20 }),
      check("password").isLength({ min: 8 }).matches(/\d/), // Exemple de validation de mot de passe (8 caractères, au moins un chiffre)
    ];
  
    // Validation des données pour la mise à jour du mot de passe
    const passwordUpdateDataChecker = [
      check("password").isLength({ min: 8 }).matches(/\d/),
    ];
  
    router.get("/login", authMiddleware.verifyToken, user.findAll);
    //router.get("/", user.findAll);
    router.get("/:id", user.findOne);

    // router.post("/", registrationDataChecker, user.create);
    // router.put("/:id", passwordUpdateDataChecker, user.updatePassword);
    router.post("/", user.create);
    router.post("/login", authMiddleware.verifyToken, user.create);
    router.put("/:id", user.updatePassword);

    router.delete("/:id", user.delete);
    router.delete("/", user.deleteAll);
  
    app.use("/api/user", router);
  };
  