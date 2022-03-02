// Logique métier de routes 
const Post = require('../models/post');
const fs = require('fs');

// création et ajout d'un post (POST)
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  post.save()
    .then(() => res.status(201).json({ message: 'Post enregistré!' }))
    .catch(error => res.status(400).json({ error }));
};

// Modification d'un post (PUT)
exports.modifyPost = (req, res, next) => {
  const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Post modifié !' }))
    .catch(error => res.status(400).json({ error }));
};
// Supression d'un post (DELETE)
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
// Trouver un post par son id (GET)
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

// Trouver tous les posts (GET)
exports.getAllPost = (req, res, next) => {
  Post.find()
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }));
};

// Envoie de like et dislike (POST)
exports.likesDislikes = (req, res, next) => {
  // likes = 1 (likes = +1)
  // chercher l'objet dans la base do donnée
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        // mise à jour post base de donnée
        Post.updateOne(
          { _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Like ajouté!" }))
          .catch((error) => res.status(400).json({ error }));
      };
      // likes = 0 (likes neutre = 0)
      if (post.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        // mise à jour post base de donnée
        Post.updateOne(
          { _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Like supprimé!" }))
          .catch((error) => res.status(400).json({ error }));
      };
      // likes = -1 (deslikes = +1)
      if (!post.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
        // mise à jour post base de donnée
        Post.updateOne(
          { _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Dislike ajouté!" }))
          .catch((error) => res.status(400).json({ error }));
      };
      // likes = 0 ( dislikes = 0)
      if (post.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
        // mise à jour post base de donnée
        Post.updateOne(
          { _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Dislike supprimé!" }))
          .catch((error) => res.status(400).json({ error }));
      };

    })
    .catch((error) => res.status(404).json({ error }));

};