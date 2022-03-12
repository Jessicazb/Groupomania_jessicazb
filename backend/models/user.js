const Sequelize = require('sequelize');
const db = require('../config/db');

const userSchema = db.define('user',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nom:{type: Sequelize.STRING, allowNull: false},
  prenom:{type: Sequelize.STRING, allowNull: false},
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false, unique:true},
  isAdmin: {type: Boolean, allowNull: false, default:0}
  // user isAdmin  -- auth 
});

// User.sync({alter:true})
module.exports = userSchema;

