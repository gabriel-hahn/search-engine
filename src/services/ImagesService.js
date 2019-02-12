const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const RequestUtils = require('../utils/RequestUtils');

module.exports = {
    async createImage(body) {
        return Image.create(body);
    },
    async findByUrl(imageUrl) {
        return Image.find({ 'imageUrl': imageUrl });
    },
    async getCountByTerm(term) {
        return Image.count({
            $or: RequestUtils.getByTerm(term)
        });
    },
    async getByTerm(term) {
        return Image.find({
            $or: RequestUtils.getByTerm(term)
        })
        .sort([['clicks', -1]]);
    }
}
