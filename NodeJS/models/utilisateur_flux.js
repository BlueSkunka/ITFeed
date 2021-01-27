const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize(`it_rss_feed`, "root", "", {
  dialect: "mariadb",
  host: "mariadb",
});
const Utilisateur = require("./utilisateur");
const Flux = require("./flux");

class UtilisateurFlux extends Model {
  static FluxIdsToArray(objects) {
    let idArray = [];
    objects.forEach((e) => {
      idArray.push(e.id_flux);
    });
    return idArray;
  }
}

UtilisateurFlux.init(
  {
    id_utilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Utilisateur,
        key: "id",
      },
    },
    id_flux: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Flux,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "utilisateur_flux",
    freezeTableName: true,
  }
);

Utilisateur.belongsToMany(Flux, {
  through: UtilisateurFlux,
  foreignKey: { name: "id_utilisateur" },
});
Flux.belongsToMany(Utilisateur, {
  through: UtilisateurFlux,
  foreignKey: { name: "id_flux" },
});

// (async () => {
//   await sequelize.sync({ alter: true });
// })();

module.exports = UtilisateurFlux;
