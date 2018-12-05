const SiteController = require('../controllers/SiteController');

module.exports = app => {
    app.post('/api/site', SiteController.insertSite);
    app.post('/api/site/siteByUrl', SiteController.getSiteByUrl);
    app.get('/api/site/getByTerm/:term', SiteController.getByTerm);
    app.get('/api/site/getCountByTerm/:term', SiteController.getCountByTerm);
}
