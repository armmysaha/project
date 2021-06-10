var mongoose = require("mongoose");

var musicSchema = new mongoose.Schema({
  title: String,
  name: String,
  image: String,
  lyrics: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
});

module.exports = mongoose.model("Music", musicSchema);
