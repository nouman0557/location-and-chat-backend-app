const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    lat: { type: String, required: true },
    lng: { type: String, required: true },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});
module.exports = mongoose.model('locationHistory', schema);