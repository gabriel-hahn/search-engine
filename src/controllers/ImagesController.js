require('babel-polyfill');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const RequestUtils = require('../utils/RequestUtils');

module.exports = {
    async insertImage(req, res) {
        let image = await Image.create(req.body);
        res.json(image);
    },
    async getImageByImageUrl(req, res) {
        let images = await Image.find({ 'imageUrl': req.body.imageUrl });
        res.json(images);
    },
    async getCountByTerm(req, res) {
        let term = req.params.term;
        let countImages = await Image.count({
            $or: RequestUtils.getByTerm(term)
        });

        res.json(countImages);
    },
    async getByTerm(req, res) {
        let term = req.params.term;
        let images = await Image.find({
            $or: RequestUtils.getByTerm(term)
        }).sort([['clicks', -1]]);

        res.json(images);
    }
};
