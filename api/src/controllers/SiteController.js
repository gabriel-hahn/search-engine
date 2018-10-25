const mongoose = require('mongoose');
const Site = mongoose.model('Site');

module.exports = {
    async insertSite(req, res) {
        let site = await Site.create(req.body);
        res.json(site);
    },
    async getSiteByUrl(req, res) {
        let sites = await Site.find({ 'url': req.body.url });
        res.json(sites);
    }
};
