const sql = require("./db.js");

const Couverture = function (couverture) {
  this.nom = couverture.nom;
  this.description = couverture.description;
};

Couverture.findById = (id, result) => {
  sql.query(`SELECT * FROM couverture WHERE id = ${id}`, (err, res) => {
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

Couverture.getAll = (result) => {
  sql.query("SELECT * FROM couverture", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Couverture.create = (newCouverture, result) => {
  sql.query("INSERT INTO couverture SET ?", newCouverture, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newCouverture });
  });
};

Couverture.updateById = (id, couverture, result) => {
  sql.query(
    "UPDATE couverture SET nom = ?, description = ? WHERE id = ?",
    [couverture.nom, couverture.description, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...couverture });
    }
  );
};

Couverture.remove = (id, result) => {
  sql.query("DELETE FROM couverture WHERE id = ?", id, (err, res) => {
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

Couverture.removeAll = (result) => {
  sql.query("DELETE FROM couverture", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Couverture;
