const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Policies extends Model {}

Policies.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName,
    underscored: true,
    modelName: "policy",
  }
);

module.exports = Policies;
