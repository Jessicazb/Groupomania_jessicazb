'use strict';
const { DataTypes, DATE } = require("sequelize")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes',{
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      users_id: { type: DataTypes.INTEGER, allowNull: false },
      post_id: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: { type: DATE, allowNull: true, default: null },
      updatedAt: { type: DATE, allowNull: true, default: null }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('likes')
  }
};
