const express = require('express');
const app = express();
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments');
const likesRoutes = require('./routes/likes');
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
app.use('/api/posts', postsRoutes);
app.use('/api/auth', usersRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/likes', likesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;