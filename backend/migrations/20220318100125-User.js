'use strict';
const { TINYINT, DataTypes, DATE } = require("sequelize")
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users',{
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: { type: DataTypes.STRING(100), allowNull: true },
      prenom: { type: DataTypes.STRING(100), allowNull: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false, unique: true },
      avatar:{type: DataTypes.STRING, allowNull: true },
      admin: { type: TINYINT(0), allowNull: true, default: 0 },
      createdAt: {type:DATE, allowNull:true, default:null},
      updatedAt: {type:DATE, allowNull:true, default:null}
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
