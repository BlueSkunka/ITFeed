"use_strict";

const express = require("express");
const { Sequelize, DataTypes, Model } = require("sequelize");

//? Constants
const PORT = 8080;
const HOST = "127.0.0.1";
const sequelize = new Sequelize(`it_rss_feed`, "root", "", {
  dialect: "mariadb",
  host: "172.18.0.2",
});

//! Connexion bdd
sequelize
  .authenticate()
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Error while trying to connect to database"));

//? Routes
const routesArticle = require("./routes/article");
const routesFlux = require("./routes/flux");
const routesUtilisateur = require("./routes/utilisateur");
const routesUtilisateurArticle = require("./routes/utilisateur_article");
const routesUtilisateurFlux = require("./routes/utilisateur_flux");

//? Api
const api = express();

api.get("/", (req, res) => {
  res.send("Hello World");
});

api.use(routesArticle);
api.use(routesFlux);
api.use(routesUtilisateurArticle);
api.use(routesUtilisateurFlux);
api.use(routesUtilisateur);

api.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);
