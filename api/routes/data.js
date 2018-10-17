module.exports = application => {
    application.get('/data', (req, res) => {
        application.controllers.DataController.insertData(req.body);
    });
}
