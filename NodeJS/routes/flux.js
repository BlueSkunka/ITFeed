const express = require("express");
const router = express.Router();
const Flux = require("./../models/flux");
const Parser = require("rss-parser");
const parser = new Parser();

// FindAll
router.get("/flux", function (req, res) {
  Flux.findAll({})
    .then((data) => {
      res.send({
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.send({ err: err });
    });
});

// CREATE
router.post("/flux", function (req, res) {
  Flux.create({
    id: null,
    nom: req.query.nom,
    url: req.query.url,
  })
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 200, err: err });
    });
});

// UPDATE
router.put("/flux/:id", function (req, res) {
  Flux.update(
    {
      nom: req.query.nom,
      url: req.query.url,
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
router.get("/flux/:id", function (req, res) {
  Flux.findOne({
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
router.delete("/flux/:id", function (req, res) {
  Flux.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

// READ FLUX
router.get("/flux/:id/feed", function (req, res) {
  Flux.findOne({
    where: { id: req.params.id },
  })
    .then((data) => {
      parser
        .parseURL(data.url)
        .then((data) => {
          res.send({ status: 200, data: data });
        })
        .catch((err) => {
          res.send({ status: 520, err: err });
        });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

module.exports = router;
