// Exemple de modèle utilisateur (user.model.js)
const bcrypt = require("bcrypt");

const User = function (user) {
  this.username = user.username;
  this.password = bcrypt.hashSync(user.password, 10);
};

// Ajoutez des méthodes pour gérer les utilisateurs, par exemple, findById, findByUsername, etc.
module.exports = User;