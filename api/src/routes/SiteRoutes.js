const SiteController = require('../controllers/SiteController');

module.exports = app => {
    app.post('/api/site', (req, res) => {
        SiteController.insertSite(req.body);
        res.send('Success insert site.');
    });

    app.post('/api/site/url', (req, res) => {
        SiteController.getSiteByUrl(req.body.url).then(response => {
            res.send(response);
        });
    });
}
