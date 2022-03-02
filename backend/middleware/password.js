// condition d'un mot de passe robuste pour la sécurité 
const passwordSchema = require('../models/validator-password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères, avec une majuscule, une miniscule et un chiffre au moins.' });
    } else {
        next();
    }
};