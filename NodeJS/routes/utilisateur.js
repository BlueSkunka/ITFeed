const express = require("express");
const router = express.Router();
const Utilisateur = require("./../models/utilisateur");

// FindAll
router.get("/utilisateurs", function (req, res) {
  Utilisateur.findAll({
    attributes: ["identifiant"],
  })
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

// CREATE
router.post("/utilisateur", function (req, res) {
  Utilisateur.create({
    id: null,
    identifiant: req.query.identifiant,
    motdepasse: req.query.motdepasse,
  })
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

// UPDATE
router.put("/utilisateur/:id", function (req, res) {
  Utilisateur.update(
    { identifiant: req.query.identifiant, motdepasse: req.query.motdepasse },
    {
      where: { id: req.params.id },
    }
  )
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

// RETRIEVE
router.get("/utilisateur/:id", function (req, res) {
  Utilisateur.findOne({
    where: { id: req.params.id },
  })
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

// DELETE
router.delete("/utilisateur/:id", function (req, res) {
  Utilisateur.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

module.exports = router;
