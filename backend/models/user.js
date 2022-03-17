const { Model, TINYINT, DataTypes } = require("sequelize")

class User extends Model {
  static init(sequelize) {
    super.init({
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
      avatar:{type: DataTypes.STRING, allowNull: false},
      admin: { type: TINYINT(0), allowNull: true, default: 0 },
    },
      {
        sequelize
      })
  }
}

module.exports = User;

