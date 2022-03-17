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
        post_id: req.body.post_id,
      })
      comment.dataValues.users = user.dataValues
      console.log("commentaire créé", comment.dataValues)
      res.status(201).json({comment: comment})
    } catch {
      res.status(500).send({error: "Erreur serveur"})
    }
  }
  
  // supression d'un commentaire
  exports.deleteComment = async (req, res) => {
    const comment = await Comment.destroy({where: {id: req.body.id}})
    res.status(200).json({comment, message: "Commentaire supprimé"})
  }
