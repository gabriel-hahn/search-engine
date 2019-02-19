const ImagesController = require('../controllers/ImagesController');

module.exports = app => {
    app.post('/api/image/imageByUrl', ImagesController.getImageByUrl);
    app.get('/api/image/getByTerm/:term', ImagesController.getByTerm);
    app.get('/api/image/getCountByTerm/:term', ImagesController.getCountByTerm);
    app.put('/api/image/increase', ImagesController.increaseClicks);
}
