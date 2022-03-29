// système de hachage par bcrypt
const bcrypt = require('bcrypt');
// package pour la création de token d'authentification
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// création d'un compte
exports.signup = async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 10)
  userInfo = {
    prenom: req.body.prenom,
    nom: req.body.nom,
    email: req.body.email,
    password: hash,
  }
  console.log("user prêt à être créé", userInfo)  
  try {
    const user = await User.create(userInfo)
    console.log("Utilisateur crée !", userInfo)
    res.status(200).json({
      id: user.id,
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
      token: jwt.sign({ userId: user.id }, `secretToken`, {
        expiresIn: "24h",
      }),
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: "Erreur serveur" })
  }
};

// connexion à un compte
exports.login = async (req, res, next) => {
  try {
    //  sequelize
    const user = await User.findOne({
      where: { email: req.body.email },
    })
    if (user == null) {
      return res.status(403).send({ error: "Vous n'êtes pas inscrit" })
    } else {
      // if user, bcrypt
      console.log("utilisateur trouvé", user.dataValues)
      const match = await bcrypt.compare(req.body.password, user.password)
      if (!match) {
        return res.status(401).json({ error: "Mot de passe incorrect !" })
      } else {
        res.status(200).json({
          id: user.id,
          prenom: user.prenom,
          nom: user.nom,
          email: user.email,
          admin: user.admin,
          //  JWT
          token: jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: "24h",
          }),
        })
      }
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
};
//modification d'un compte

exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { id: req.body.id } })
    console.log("User trouvé : ", user.dataValues)
    if (req.body.email) {
      user.email = req.body.email
      console.log("Ancien email : ", user.email)
    }
    if (req.body.prenom) {
      user.prenom = req.body.prenom
      console.log("Ancien prénom : ", user.prenom)
    }
    if (req.body.nom) {
      user.nom = req.body.nom
      console.log("Ancien nom : ", user.nom)
    }
    try {
      user.save({})
      console.log("New userInfo : ", user)
      res.status(200).json({
        user: user,
        messageRetour: "Votre profil a bien été modifié",
      })
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Erreur lors de la mise à jour de votre proifl" })
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

// soupression d'un compte
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.body.id } })
    console.log("User to delete : ", user.dataValues)
    User.destroy({ where: { id: user.id } })
    res.status(200).json({ message: "Utilisateur supprimé" })
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" })
  }
}

exports.getUser = async (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
  .then((user) => res.status(200).json(user))
  .catch((error) => res.status(500).json({ error:"Erreur serveur" }));
}


// création avatar user
/*exports.createAvatar = async (req, res, next) => {
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
      const avatar = await avatar.create({
        imageUrl: imageUrl,
      })
      avatar.dataValues.user = user.dataValues
      console.log("Avatar créé :", avatar.dataValues)
      res.status(201).json({avatar: avatar})
    } else {
      res.status(400).json({réponse: "L'utilisateur n'existe pas, il n'est pas possible d'ajouter un avatar"})
    }
  } catch (error) {
    return res.status(500).send({error: "Erreur serveur"})
  }
}; */
