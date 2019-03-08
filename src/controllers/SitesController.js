require("babel-polyfill");
const SitesService = require("../services/SitesService");

module.exports = {
  async getSiteByUrl(req, res) {
    let site = await SitesService.findByUrl(req.body.url);
    res.json(site);
  },
  async getCountByTerm(req, res) {
    let countSites = await SitesService.countByTerm(req.params.term);
    res.json(countSites);
  },
  async getByTerm(req, res) {
    let sites = await SitesService.getByTerm(
      req.params.term,
      req.headers.limit
    );
    res.json(sites);
  },
  async increaseClicks(req, res) {
    let site = await SitesService.increaseClicks(req.body.id);
    res.json(site);
  }
};
