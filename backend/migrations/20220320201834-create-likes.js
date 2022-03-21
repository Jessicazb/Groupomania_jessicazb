'use strict';
const { DataTypes, DATE } = require("sequelize")

module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.createTable('likes',{
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      users_id: { type: DataTypes.INTEGER, allowNull: false },
      posts_id: { type: DataTypes.INTEGER, allowNull: false },
      createdAt: { type: DATE, allowNull: true, default: null },
      updatedAt: { type: DATE, allowNull: true, default: null }
    });

    await queryInterface.addConstraint('likes', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'fk_users_id_in_likes',
      references: { //Required field
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('likes', {
      fields: ['posts_id'],
      type: 'foreign key',
      name: 'fk_posts_id_in_likes',
      references: { //Required field
        table: 'posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.removeConstraint('likes', 'fk_users_id_in_likes')
     await queryInterface.removeConstraint('likes', 'fk_posts_id_in_likes')
     await queryInterface.dropTable('likes')
  }
};