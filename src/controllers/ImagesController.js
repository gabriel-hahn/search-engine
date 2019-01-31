require('babel-polyfill');
const ImagesService = require('../services/ImagesService');

module.exports = {
    async getImageByImageUrl(req, res) {
        let images = await ImagesService.findByUrl(req.body.imageUrl);
        res.json(images);
    },
    async getCountByTerm(req, res) {
        let countImages = await ImagesService.getCountByTerm(req.params.term);
        res.json(countImages);
    },
    async getByTerm(req, res) {
        let images = await ImagesService.getByTerm(req.params.term);
        res.json(images);
    }
};
