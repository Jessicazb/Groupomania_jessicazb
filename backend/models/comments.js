"use strict"
const {Model} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "comments",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {type: DataTypes.STRING, allowNull: false},
      users_id: {type: DataTypes.INTEGER, allowNull: false},
      post_id: {type: DataTypes.INTEGER, allowNull: false},
    },

    {
      sequelize,
      modelName: "Comments",
    }
  )
  return Comments
}