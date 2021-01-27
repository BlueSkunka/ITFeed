const { Sequelize, DataTypes, Model } = require("sequelize");
const Article = require("./article");
const Utilisateur = require("./utilisateur");
const sequelize = new Sequelize(`it_rss_feed`, "root", "", {
  dialect: "mariadb",
  host: "mariadb",
});

class UtilisateurArticle extends Model {
  static ArticleIdsToArray(objects) {
    let idArray = [];
    objects.forEach((e) => {
      idArray.push(e.id_article);
    });
    return idArray;
  }
}

UtilisateurArticle.init(
  {
    id_utilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Utilisateur,
        key: "id",
      },
    },
    id_article: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Article,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "utilisateur_article", freezeTableName: true }
);

Utilisateur.belongsToMany(Article, {
  through: UtilisateurArticle,
  foreignKey: { name: "id_utilisateur" },
});
Article.belongsToMany(Utilisateur, {
  through: UtilisateurArticle,
  foreignKey: { name: "id_article" },
});

// (async () => {
//   await sequelize.sync({ alter: true });
// })();

module.exports = UtilisateurArticle;
