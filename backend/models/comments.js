const { Model, DataTypes } = require("sequelize")

class Comments extends Model {
  static init(sequelize) {
    super.init({
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
        sequelize
      })
  }
}

module.exports = Comments;