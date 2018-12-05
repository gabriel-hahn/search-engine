const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SitesSchema = new Schema({
    url: { type: String, required: true, max: 512 },
    title: { type: String, required: true, max: 512 },
    description: { type: String, required: true, max: 512 },
    keywords: { type: String, required: false, max: 512 },
    clicks: { type: Number, required: true, default: 0 },
});

mongoose.model('Site', SitesSchema);
