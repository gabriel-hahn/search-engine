var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/searchEngine";
const dbName = 'searchEngine';

module.exports = application = {
    insert: (data) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            if (err) throw err;

            let db = client.db(dbName);

            console.log('Inserindo um registro');
            client.close();
        });
    }
}
