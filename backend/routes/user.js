// logique de routes
const express = require('express');
const router = express.Router();
const validatePassword = require ('../middleware/password');
const tentativeConnexion = require ('../middleware/rate-limit');

const userCtrl = require('../controllers/user');

router.post('/signup', validatePassword, userCtrl.signup);
router.post('/login', tentativeConnexion.limiteur, userCtrl.login);
router.put('/', userCtrl.updateUser);
router.delete('/', userCtrl.deleteUser);

module.exports = router;