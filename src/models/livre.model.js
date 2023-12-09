const sql = require("./db.js");

const Livre = function (livre) {
  this.titres = livre.titres;
  this.nb_pages = livre.nb_pages;
  this.categorie = livre.categorie;
  this.id_auteur = livre.id_auteur;
  this.id_couverture = livre.id_couverture;
};

Livre.findById = (id, result) => {
  sql.query(`SELECT * FROM livre WHERE id = ${id}`, (err, res) => {
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

Livre.getAll = (result) => {
  sql.query("SELECT * FROM livre", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Livre.create = (newLivre, result) => {
  sql.query("INSERT INTO livre SET ?", newLivre, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newLivre });
  });
};

Livre.updateById = (id, livre, result) => {
  sql.query(
    "UPDATE livre SET titres = ?, nb_pages = ?, categorie = ?, id_auteur = ?, id_couverture = ? WHERE id = ?",
    [livre.titres, livre.nb_pages, livre.categorie, livre.id_auteur, livre.id_couverture, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...livre });
    }
  );
};

Livre.remove = (id, result) => {
  sql.query("DELETE FROM livre WHERE id = ?", id, (err, res) => {
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

Livre.removeAll = (result) => {
  sql.query("DELETE FROM livre", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Livre;
