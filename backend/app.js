const express = require('express');
const app = express();
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/likes');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

//connection avec la base de donnés
require('./database');

// middleware pour l'application accéder l'API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"*");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(cors())
app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;