const express = require("express");
const router = express.Router();
const UtilisateurArticle = require("./../models/utilisateur_article");
const Article = require("./../models/article");

// FindAllByUtilisateur
router.get("/utilisateur/:id_utilisateur/articles", function (req, res) {
  UtilisateurArticle.findAll({
    attributes: ["id_article"],
    where: { id_utilisateur: req.params.id_utilisateur },
    raw: true,
  })
    .then((ids) => {
      const idArray = UtilisateurArticle.ArticleIdsToArray(ids);
      Article.findAll({
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
router.post("/utilisateur/article", function (req, res) {
  UtilisateurArticle.create({
    id_utilisateur: req.query.id_utilisateur,
    id_article: req.query.id_article,
  })
    .then((data) => {
      res.send({ status: 200, data: data });
    })
    .catch((err) => {
      res.send({ status: 520, err: err });
    });
});

// DELETE
router.delete("/utilisateur/article", function (req, res) {
  UtilisateurArticle.destroy({
    where: {
      id_utilisateur: req.query.id_utilisateur,
      id_article: req.query.id_article,
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
