const mongoose = require("mongoose");
const requireDir = require("require-dir");

const dbName = "searchEngine";
const url = `mongodb://localhost:27017/${dbName}`;

//In this case, I keep the connect with MongoDB opens, but in a production environment, the connection only will be open each request.
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });
requireDir("../models");
