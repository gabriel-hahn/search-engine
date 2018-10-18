const DataController = require('../controllers/DataController');

module.exports = app => {
    app.get('/data', (req, res) => {
        DataController.insertData(req.body);
        res.send('Teste');
    });
}

/* const express = require('express');
const DataController = require('../controllers/DataController');

const routes = express.Router();

routes.get('/api/data', (req, res) => {
    DataController.insertData(req.body, app);
});

module.exports = routes; */
