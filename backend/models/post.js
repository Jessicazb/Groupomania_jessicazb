const { Model, DataTypes } = require("sequelize")

class Posts extends Model {
  static init(sequelize) {
    super.init({
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
    },
      {
        sequelize
      })
  }
}

module.exports = Posts;
