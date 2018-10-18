const mongoose = require('mongoose');
const MongoDb = require('../../config/mongodb');

insertData = data => {
    const Data = mongoose.model('Data');

    MongoDb.connectDb();

    Data.create({
        url: 'Url teste',
        title: 'Title teste',
        description: 'Description teste',
        keywords: 'Keywords teste',
        clicks: 0,
    });

    MongoDb.disconnectDb();
}

module.exports = { insertData }
