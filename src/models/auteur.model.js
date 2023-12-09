const sql = require("./db.js");

const Auteur = function (auteur) {
  this.nom = auteur.nom;
  this.prenom = auteur.prenom;
  this.telephone = auteur.telephone;
  this.email = auteur.email;
};

Auteur.findById = (id, result) => {
  sql.query(`SELECT * FROM auteur WHERE id = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Auteur.getAll = (title, result) => {
  let query = "SELECT * FROM auteur";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Auteur.create = (newAuteur, result) => {
  sql.query("INSERT INTO auteur SET ?", newAuteur, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newAuteur });
  });
};

Auteur.updateById = (id, auteur, result) => {
  sql.query(
    "UPDATE auteur SET nom = ?, prenom = ?, telephone = ?, email = ? WHERE id = ?",
    [auteur.nom, auteur.prenom, auteur.telephone, auteur.email, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...auteur });
    }
  );
};

Auteur.remove = (id, result) => {
  sql.query("DELETE FROM auteur WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

Auteur.removeAll = result => {
  sql.query("DELETE FROM auteur", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Auteur;
