const sql = require("./db.js");

const Genre = function (genre) {
  this.nom = genre.nom;
};

Genre.findById = (id, result) => {
  sql.query(`SELECT * FROM genre WHERE id = ${id}`, (err, res) => {
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

Genre.getAll = (result) => {
  sql.query("SELECT * FROM genre", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Genre.create = (newGenre, result) => {
  sql.query("INSERT INTO genre SET ?", newGenre, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newGenre });
  });
};

Genre.updateById = (id, genre, result) => {
  sql.query(
    "UPDATE genre SET nom = ? WHERE id = ?",
    [genre.nom, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...genre });
    }
  );
};

Genre.remove = (id, result) => {
  sql.query("DELETE FROM genre WHERE id = ?", id, (err, res) => {
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

Genre.removeAll = (result) => {
  sql.query("DELETE FROM genre", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Genre;
