const { startEvents } = require('../services/LinksService');

module.exports = app => {
    app.post('/api/start', startEvents);
}
