const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize(`it_rss_feed`, "root", "", {
  dialect: "mariadb",
  host: "mariadb",
});

class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titre: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
  },
  { sequelize, modelName: "article", freezeTableName: true }
);

// (async () => {
//   await sequelize.sync({ alter: true });
// })();

module.exports = Article;
