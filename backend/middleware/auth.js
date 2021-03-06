// middleware d'authentification 
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: 'token inexistant' });

  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(
      token,
      'RANDOM_TOKEN_SECRET'
    );

    req.auth = { userId: decoded.userId };

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token non valide.' });
  }
};