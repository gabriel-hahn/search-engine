import express from 'express';
import consign from 'consign';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json('application/json'));
app.use(expressValidator());

consign()
    .include('/config/mongodb.js')
    .then('/src/routes')
    .then('/src/controllers')
    .into(app);

module.exports = app;
