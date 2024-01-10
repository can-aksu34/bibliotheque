const sql = require("./db.js");
const bcrypt = require("bcrypt");

const User = function (user) {
  this.username = user.username;
  // this.password = bcrypt.hashSync(user.password, 10);
  this.password = user.password;
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
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

User.getAll = (result) => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newUser });
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user SET username = ?, password = ? WHERE id = ?",
    [user.username, bcrypt.hashSync(user.password, 10), id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
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

User.removeAll = result => {
  sql.query("DELETE FROM user", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = User;
