const mongoose = require('mongoose');
const Site = mongoose.model('Site');
const RequestUtils = require('../utils/RequestUtils');

module.exports = {
    async createSite(body) {
        return Site.create(body);
    },
    async findByUrl(siteUrl) {
        return Site.find({ 'url': siteUrl });
    },
    async countByTerm(term) {
        return Site.count({
            $or: RequestUtils.getByTerm(term)
        });
    },
    async getByTerm(term, limit) {
        return Site.find({
            $or: RequestUtils.getByTerm(term)
        })
        .sort([['clicks', -1]])
        .skip(limit ? parseInt(limit) : 0)
        .limit(20);
    }
}
