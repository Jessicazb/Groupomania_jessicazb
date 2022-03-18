'use strict';
const { DataTypes, DATE } = require("sequelize")
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts',{
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      text_content: { type: DataTypes.STRING, allowNull: true },
      imageUrl: { type: DataTypes.STRING, allowNull: true },
      comments: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
      users_id: { type: DataTypes.INTEGER, allowNull: false },
      likes: { type: DataTypes.INTEGER, allowNull: true,defaultValue: 0},
      createdAt: {type:DATE, allowNull:true, default:null},
      updatedAt: {type:DATE, allowNull:true, default:null}
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('posts')
  }
};
