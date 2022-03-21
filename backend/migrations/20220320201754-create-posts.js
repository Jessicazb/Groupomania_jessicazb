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
      author: { type: DataTypes.STRING, allowNull: true },
      imageUrl: { type: DataTypes.STRING, allowNull: true },
      users_id: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: {type:DATE, allowNull:true, default:null},
      updatedAt: {type:DATE, allowNull:true, default:null}
    });

    await queryInterface.addConstraint('posts', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'fk_users_id_in_posts',
      references: { //Required field
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeConstraint('comments', 'fk_users_id_in_posts')
    await queryInterface.dropTable('posts')
  }
};
