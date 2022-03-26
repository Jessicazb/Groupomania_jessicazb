const Comment = require('../models/comments')
const User = require('../models/user');

// création d'un commentaire
exports.createComment = async (req, res, next) => {
    try {
      const user = await User.findOne({
        attributes: ["nom", "prenom", "id"],
        where: {id: req.body.users_id},
      })
      console.log("utilisateur trouvé", user.dataValues)
      const comment = await Comment.create({
        content: req.body.content,
        users_id: req.body.users_id,
        posts_id: req.body.posts_id,
      })
      comment.dataValues.User = user.dataValues
      console.log("commentaire créé", comment.dataValues)
      res.status(201).json({comment: comment})
    } catch {
      res.status(500).send({error: "Erreur serveur"})
    }
  }
  
  // supression d'un commentaire
  exports.deleteComment = async (req, res) => {
    const comment = await Comment.destroy({where: {id: req.params.id}})
    res.status(200).json({comment, message: "Commentaire supprimé"})
  }
  exports.getComment = (req, res, next) => {
    Comment.findAll({ 
      where: { posts_id: req.query.id },
      include: [
        {
          model: User,
          attributes: ["prenom", "nom", "id"],
        }
      ]
    })
      .then((comments) => res.status(200).json(comments))
      .catch((error) => res.status(404).json({ error }));
  };
