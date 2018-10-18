const mongoose = require('mongoose');
const requireDir = require('require-dir');

const dbName = 'searchEngine';
const url = `mongodb://localhost:27017/${dbName}`;

module.exports = {
    connectDb: () => {
        mongoose.connect(url, { useNewUrlParser: true });
        requireDir('../src/models');
    },
    disconnectDb: () => {
        mongoose.disconnect();
    }
}
