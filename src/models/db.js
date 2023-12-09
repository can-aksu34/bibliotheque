// const mysql = require("mysql");
// const dbConfig = require("../config/db.config.js");

// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });

// connection.connect(error => {
//   if (error) throw error;
//   console.log("Connection à la BDD avec succès.");
// });

// module.exports = connection;
const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection({
  host: dbConfig.database.host,
  user: dbConfig.database.user,
  password: dbConfig.database.password,
  database: dbConfig.database.database
});

connection.connect(error => {
  if (error) throw error;
  console.log("Connexion à la BDD réussie.");
});

module.exports = connection;
