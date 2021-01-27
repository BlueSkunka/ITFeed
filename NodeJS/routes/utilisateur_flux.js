const express = require("express");
const router = express.Router();
const UtilisateurFlux = require("./../models/utilisateur_flux");
const Flux = require("../models/flux");

// FindAllByUtilisateur
router.get("/utilisateur/:id_utilisateur/flux", function (req, res) {
  UtilisateurFlux.findAll({
    attributes: ["id_flux"],
    where: { id_utilisateur: req.params.id_utilisateur },
    raw: true,
  })
    .then((ids) => {
      const idArray = UtilisateurFlux.FluxIdsToArray(ids);
      Flux.findAll({
        where: { id: idArray },
      })
        .then((data) => {
          res.send({ status: 200, data: data });
        })
        .catch((err) => {
          res.send({ status: 520, err: err, ids: ids });
        });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

// CREATE
router.post("/utilisateur/flux", function (req, res) {
  UtilisateurFlux.create({
    id_utilisateur: req.query.id_utilisateur,
    id_flux: req.query.id_flux,
  })
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

// DELETE
router.delete("/utilisateur/flux", function (req, res) {
  UtilisateurFlux.destroy({
    where: {
      id_utilisateur: req.query.id_utilisateur,
      id_flux: req.query.id_flux,
    },
  })
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

module.exports = router;
