const mongoose = require('mongoose');
const Image = mongoose.model('Image');

module.exports = {
    async insertImage(req, res) {
        let image = await Image.create(req.body);
        res.json(image);
    },
    async getImageByImageUrl(req, res) {
        let images = await Image.find({ 'imageUrl': req.body.imageUrl });
        res.json(images);
    },
    async getByTerm(req, res) {
        let term = req.params.term;
        let images = await Image.find(
            {
                $or: [
                    {
                        'siteUrl': { '$regex': term, '$options': 'i' }
                    },
                    {
                        'imageUrl': { '$regex': term, '$options': 'i' }
                    },
                    {
                        'alt': { '$regex': term, '$options': 'i' }
                    },
                    {
                        'title': { '$regex': term, '$options': 'i' }
                    }
                ]
            }).sort([['clicks', -1]]);

        res.json(images);
    }
};
