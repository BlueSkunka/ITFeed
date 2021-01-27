const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize(`it_rss_feed`, "root", "", {
  dialect: "mariadb",
  host: "mariadb",
});

class Flux extends Model {}

Flux.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  { sequelize, modelName: "flux", freezeTableName: true }
);

// (async () => {
//   await sequelize.sync({ alter: true });
// })();

module.exports = Flux;
