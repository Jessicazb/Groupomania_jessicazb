"use strict"
const {Model, TINYINT} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {type: DataTypes.STRING(100), allowNull: true},
      prenom: {type: DataTypes.STRING(100), allowNull: true},
      email: {type: DataTypes.STRING, allowNull: false, unique: true},
      password: {type: DataTypes.STRING, allowNull: false, unique: true},
      admin: {type: TINYINT(0), allowNull: true, default: 0},
    },
    {
      sequelize,
      modelName: "Users",
    }
  )
  return Users
}

