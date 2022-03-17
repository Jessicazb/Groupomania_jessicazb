const express = require('express');
const app = express();
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const path = require('path');

//connection avec la base de donnés
require('./database');

// middleware pour l'application accéder l'API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);
app.use('api/comment', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;