const Queue = require("./Queue");
const Article = require("./Article");
const Policy = require("./Policy");

Policy.hasMany(Article, {
  foreignKey: "policy_id",
});

Article.belongsTo(Policy, {
  foreignKey: "policy_id",
});

module.exports = { Queue, Article, Policy };
