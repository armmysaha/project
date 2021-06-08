var mongoose = require('mongoose');

var musicSchema = new mongoose.Schema({
    title: String,
    name: String,
    image: String,
    lyrics: String,
});

module.exports = mongoose.model('Music', musicSchema);