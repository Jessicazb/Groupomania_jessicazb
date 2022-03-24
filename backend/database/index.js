// connection avec base de données 
const Sequelize = require('sequelize');
const configDB = require('../config/db');

const User = require('../models/user');
const Posts = require('../models/post');
const Comments = require('../models/comments');
const Likes = require('../models/likes');

const connectionDB = new Sequelize(configDB);
console.log('connecté à la base de donnée!')

User.init(connectionDB);
Posts.init(connectionDB);
Comments.init(connectionDB);
Likes.init(connectionDB);

Posts.belongsTo(User, {foreignKey: 'users_id'});
Comments.belongsTo(User, {foreignKey: 'users_id'});
Comments.belongsTo(Posts, {foreignKey: 'posts_id'});

module.exports = connectionDB;