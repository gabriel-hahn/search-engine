const mongoose = require('mongoose');
const Image = mongoose.model('Image');

module.exports = {
    async insertImage(req, res) {
        let site = await Site.create(req.body);
        res.json(site);
    },
    async getImageByImageUrl(req, res) {
        let images = await Image.find({ 'imageUrl': req.params.imageUrl });
        res.json(images);
    }
};
