const ImagesController = require('../controllers/ImagesController');

module.exports = app => {
    app.post('/api/image', ImagesController.insertImage),
    app.post('/api/image/imageByUrl', ImagesController.getImageByImageUrl);
}
