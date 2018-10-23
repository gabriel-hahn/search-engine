const SiteController = require('../controllers/SiteController');

module.exports = app => {
    app.post('/api/site', SiteController.insertSite),
    app.get('/api/site/:url', SiteController.getSiteByUrl);
}
