// Gestion des fichiers entrants 
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const filename = `${Date.now()}.${file.originalname
      .split('.')
      .pop()}`;

    console.log(filename);
    callback(null, filename);
  }
});

module.exports = multer({ storage: storage }).single('image');