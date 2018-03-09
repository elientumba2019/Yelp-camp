var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

var model = mongoose.model("Comment", commentSchema);

module.exports = model;