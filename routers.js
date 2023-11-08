const express = require("express");
const router = express.Router();
const connection = require("./mongodb");
const { ObjectId } = require("mongodb");

const db = connection.db("db_latihan");

router.get("/", (req, res) => {
  res.send("Hello Brows!");
});

router.get("/users", async (req, res) => {
  try {
    if (connection.connect) {
      const users = await db.collection("users").find().toArray();
      res.send({ message: "Data ditemukan", data: users });
    } else {
      res.send({ message: "Koneksi gagal" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (connection.connect) {
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });
      res.send({ message: "Data ditemukan", data: user });
    } else {
      res.send({ message: "Koneksi gagal" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/user", async (req, res) => {
  try {
    if (connection.connect) {
      const { name, age, status } = req.body;
      const user = await db.collection("users").insertOne({
        name,
        age,
        status,
      });
      const users = await db
        .collection("users")
        .findOne({ _id: user.insertedId });
      res.send({ message: "Berhasil input", data: { users } });
    } else {
      res.send({ message: "Koneksi gagal" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    if (connection.connect) {
      const { id } = req.params;
      const { name, age, status } = req.body;
      const user = await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            name,
            age,
            status,
          },
        }
      );
      const users = await db.collection("users").findOne({ _id: user._id });
      res.send({ message: "Berhasil Diubah", data: { users } });
    } else {
      res.send({ message: "Koneksi gagal" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    if (connection.connect) {
      const { id } = req.params;
      const user = await db
        .collection("users")
        .findOneAndDelete({ _id: new ObjectId(id) });
      res.send({ message: "Data dihapus", data: { user } });
    } else {
      res.send({ message: "Koneksi gagal" });
    }
  } catch (error) {}
});

module.exports = router;
