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
    },
    async getByTerm(req, res) {
        let term = req.params.term;
        let sites = await Site.find(
            {
                $or: [
                    {
                        'url': { '$regex': term, '$options': 'i' }
                    },
                    {
                        'title': { '$regex': term, '$options': 'i' }
                    },
                    {
                        'description': { '$regex': term, '$options': 'i' }
                    },
                    {
                        'keywords': { '$regex': term, '$options': 'i' }
                    }
                ]
            });

        res.json(sites);
    }
};
