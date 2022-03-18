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
      imageUrl: { type: DataTypes.STRING, allowNull: true },
      comments: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
      users_id: { type: DataTypes.INTEGER, allowNull: false },
      likes: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0}
    },
      {
        sequelize
      })
  }
}

module.exports = Posts;
