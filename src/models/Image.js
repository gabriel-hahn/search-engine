const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ImagesSchema = new Schema({
    siteUrl: { type: String, required: true, max: 512 },
    imageUrl: { type: String, required: true, max: 950 },
    alt: { type: String, required: false, max: 512 },
    title: { type: String, required: false, max: 512 },
    clicks: { type: Number, required: true, default: 0 },
    broken: { type: Boolean, required: true, default: false },
});

mongoose.model('Image', ImagesSchema);
