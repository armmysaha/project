var mongoose = require("mongoose");

var favoriteSchema = new mongoose.Schema({
  username: String,
  title: String,
  name: String,
  image: String,
});

module.exports = mongoose.model("Favorite", favoriteSchema);
