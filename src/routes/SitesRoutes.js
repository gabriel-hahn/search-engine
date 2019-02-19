const SiteController = require('../controllers/SitesController');

module.exports = app => {
    app.post('/api/site/siteByUrl', SiteController.getSiteByUrl);
    app.get('/api/site/getByTerm/:term', SiteController.getByTerm);
    app.get('/api/site/getCountByTerm/:term', SiteController.getCountByTerm);
    app.put('/api/site/increase', SiteController.increaseClicks);
}
