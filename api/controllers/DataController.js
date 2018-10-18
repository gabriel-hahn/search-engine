module.exports = {
    insertData: (data, app) => {
        app.config.mongodb.insert(data);
    }
}
