const SiteController = require('../controllers/SiteController');

module.exports = app => {
    app.post('/api/site', (req, res) => {
        SiteController.insertSite(req.body);
        res.send('Success insert site.');
    });
}
