// logique de routes
const express = require('express');
const router = express.Router();
const validatePassword = require ('../middleware/password');
const tentativeConnexion = require ('../middleware/rate-limit');
//const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', validatePassword, userCtrl.signup);
router.post('/login', tentativeConnexion.limiteur, userCtrl.login);
//router.post('/avatar-user', multer, userCtrl.createAvatar);
router.put('/updateUser', userCtrl.updateUser);
router.delete('/deleteUser', userCtrl.deleteUser);

module.exports = router;