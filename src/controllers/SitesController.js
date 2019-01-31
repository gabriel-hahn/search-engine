require('babel-polyfill');
const SitesService = require('../services/SitesService');

module.exports = {
    async getSiteByUrl(req, res) {
        let sites = await SitesService.findByUrl(req.body.url);
        res.json(sites);
    },
    async getCountByTerm(req, res) {
        let countSites = await SitesService.countByTerm(req.params.term);
        res.json(countSites);
    },
    async getByTerm(req, res) {
        let sites = await SitesService.getByTerm(req.params.term);
        res.json(sites);
    }
};
