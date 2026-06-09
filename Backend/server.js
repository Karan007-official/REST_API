const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users ORDER BY id DESC", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

app.post("/users", (req, res) => {
  const { name, email, phone, company } = req.body;

  db.query(
    "INSERT INTO users(name,email,phone,company) VALUES(?,?,?,?)",
    [name, email, phone, company],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User Added Successfully",
      });
    },
  );
});

app.put("/users/:id", (req, res) => {
  const { name, email, phone, company } = req.body;

  db.query(
    "UPDATE users SET name=?, email=?, phone=?, company=? WHERE id=?",
    [name, email, phone, company, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User Updated Successfully",
      });
    },
  );
});

app.delete("/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "User Deleted Successfully",
    });
  });
});

app.post("/import-users", (req, res) => {
  const users = req.body;

  users.forEach((user) => {
    db.query("INSERT INTO users(name,email,phone,company) VALUES(?,?,?,?)", [
      user.name,
      user.email,
      user.phone,
      user.company.name,
    ]);
  });

  res.json({
    message: "API Users Imported Successfully",
  });
});

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
