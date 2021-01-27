const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize(`it_rss_feed`, "root", "", {
  dialect: "mariadb",
  host: "mariadb",
});

class Utilisateur extends Model {}

Utilisateur.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    identifiant: DataTypes.STRING,
    motdepasse: DataTypes.STRING,
  },
  { sequelize, modelName: "utilisateur", freezeTableName: true }
);

// (async () => {
//   await sequelize.sync({ alter: true });
// })();

module.exports = Utilisateur;
