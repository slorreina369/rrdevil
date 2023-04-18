const Queue = require("./Queue");
const Article = require("./Article");
const Policy = require("./Policy");

//Sequelize runs very slow here.....the bitch
Policy.hasMany(Article, {
  foreignKey: "policy_id",
});

Article.belongsTo(Policy, {
  foreignKey: "policy_id",
});

module.exports = { Queue, Article, Policy };
