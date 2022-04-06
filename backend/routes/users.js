// logique de routes
const express = require('express');
const router = express.Router();
const validatePassword = require ('../middleware/password');
const tentativeConnexion = require ('../middleware/rate-limit');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/users');

router.post('/signup', validatePassword, userCtrl.signup);
router.post('/login', tentativeConnexion.limiteur, userCtrl.login);
router.get('/updateUser/:id', userCtrl.getUser);
router.put('/updateUser/:id', multer, userCtrl.updateUser);
router.delete('/deleteUser', multer,userCtrl.deleteUser);

module.exports = router;