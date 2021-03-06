// Logique métier de routes 
const Post = require('../models/posts');
const fs = require('fs');
const User = require('../models/users');
const { post } = require('../routes/posts');
const Comments = require('../models/comments');

// création et ajout d'un post (POST)
exports.createPost = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ["nom", "prenom", "id"],
      where: {id: req.body.users_id},
      order: [["createdAt", "DESC"]],
    })

    if (user !== null) {
      console.log("user :", user)
      let imageUrl
      if (req.file) {
        console.log("filename", req.file.filename)
        imageUrl = `${req.file.filename}`
      } else {
        imageUrl = null
      }
      const post = await Post.create({
        users_id: req.body.users_id,
        text_content: req.body.text_content,
        imageUrl: imageUrl,
      })
      post.dataValues.user = user.dataValues
      console.log("Post créé :", post.dataValues)
      res.status(201).json({post: post})
    } else {
      res.status(400).json({réponse: "L'utilisateur n'existe pas"})
    }
  } catch (error) {
    return res.status(500).send({error: "Erreur serveur"})
  }
};

// Supression d'un post (DELETE)
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({where: {id: req.params.id}})
    console.log("Post trouvé :", post)
    if (post.imageUrl) {
      const filename = post.imageUrl.split("/images")[0]
      console.log("Filename to Delete", filename)
      fs.unlink(`images/${filename}`, function(error) {
        if(error){
          throw error;
        }
        Comments.destroy({where : {posts_id:req.params.id}})
        Post.destroy({where: {id: req.params.id}})
        res.status(200).json({message: "Post et image supprimé"})
      })
    } else {
      Post.destroy({where: {id: post.id}}, {truncate: true})
      res.status(200).json({message: "Post supprimé"})
    }
  } catch (error) {
    return res.status(500).send({error: "Erreur serveur"})
  }
};


// Trouver tous les posts (GET)
exports.getAllPost = (req, res, next) => {
  try {
    Post.findAll({
     attributes: ["id", "text_content", "imageUrl", "createdAt", "users_id"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["avatar", "prenom", "nom", "id"],
        },
      ],
    }).then(posts => {
      posts.map(post => {
      if( post.imageUrl) post.imageUrl = `http://localhost:4200/images/${post.imageUrl}`
      if(post.User.avatar) post.User.avatar = `http://localhost:4200/images/${post.User.avatar}`
      });
      res.json(posts)
    })
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenue lors de la récupération des posts ",
    })
  }
};

