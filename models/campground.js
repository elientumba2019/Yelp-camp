var mongoose = require('mongoose');

//schema for the database
//campground schema
var campgroundSchema = new mongoose.Schema({
    name : String,
    image : String,
    description : String
});

var Campground = mongoose.model('Campground' , campgroundSchema);


//exporting the model
module.exports = Campground;
