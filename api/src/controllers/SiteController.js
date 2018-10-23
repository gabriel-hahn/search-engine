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

getSiteByUrl = url => {
    const Site = mongoose.model('Site');

    MongoDb.connectDb();

    let doc = Site.find({ 'url': url });

    MongoDb.disconnectDb();

    return doc;
}

module.exports = { insertSite, getSiteByUrl }
