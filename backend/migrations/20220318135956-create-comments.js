'use strict';
const { DataTypes, DATE } = require("sequelize")
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comments',{
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {type: DataTypes.STRING, allowNull: false},
      users_id: {type: DataTypes.INTEGER, allowNull: false},
      post_id: {type: DataTypes.INTEGER, allowNull: false},
      createdAt: {type:DATE, allowNull:true, default:null},
      updatedAt: {type:DATE, allowNull:true, default:null}
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('comments')
  }
};
