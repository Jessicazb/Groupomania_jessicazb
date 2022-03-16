const Comment = require('../models/comments')
const db = require('../config/db');
const userInfo = db.users

// création d'un commentaire
exports.createComment = async (req, res) => {
    try {
      const user = await userInfo.findOne({
        attributes: ["nom", "prenom", "id"],
        where: {id: req.body.users_id},
      })
      console.log("user trouvé", user.dataValues)
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
  
  // soupression d'un commentaire
  exports.deleteComment = async (req, res) => {
    const comment = await Comment.destroy({where: {id: req.body.id}})
    res.status(200).json({comment, message: "Commentaire supprimé"})
  }
