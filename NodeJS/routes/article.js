const express = require("express");
const router = express.Router();
const Article = require("./../models/article");

// FindAll
router.get("/articles", function (req, res) {
  Article.findAll({})
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

// CREATE
router.post("/article", function (req, res) {
  Article.create({
    id: null,
    titre: req.query.titre,
    description: req.query.description,
    date: req.query.date,
  })
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

// UPDATE
router.put("/article/:id", function (req, res) {
  Article.update(
    {
      titre: req.query.titre,
      description: req.query.description,
      date: req.query.date,
    },
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

// RETIEVE
router.get("/article/:id", function (req, res) {
  Article.findOne({
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
router.delete("/article/:id", function (req, res) {
  Article.destroy({
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
