const mongoose = require('mongoose');
const MongoDb = require('../../config/mongodb');

insertSite = data => {
    const Site = mongoose.model('Site');

    MongoDb.connectDb();

    Site.create({
        url: data.url,
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        clicks: 0,
    });

    MongoDb.disconnectDb();
}

module.exports = { insertSite }
