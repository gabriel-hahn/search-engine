const mongoose = require('mongoose');
const Site = mongoose.model('Site');
const RequestUtils = require('../utils/RequestUtils');

module.exports = {
    async insertSite(req, res) {
        let site = await Site.create(req.body);
        res.json(site);
    },
    async getSiteByUrl(req, res) {
        let sites = await Site.find({ 'url': req.body.url });
        res.json(sites);
    },
    async getCountByTerm(req, res) {
        let term = req.params.term;
        let countSites = await Site.count({
            $or: RequestUtils.getByTerm(term)
        });

        res.json(countSites);
    },
    async getByTerm(req, res) {
        let term = req.params.term;
        let sites = await Site.find({
            $or: RequestUtils.getByTerm(term)
        }).sort([['clicks', -1]]);

        res.json(sites);
    }
};
