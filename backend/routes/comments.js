// logique de routes
const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

router.post('/', auth, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.get('/', auth, commentCtrl.getComment);


module.exports = router;