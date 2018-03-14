var mongoose = require('mongoose');
var pasportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema(
    {
        username : String,
        password : String
    }
);


//step 2 adding mongoose plugin to the user model
UserSchema.plugin(pasportLocalMongoose)

module.exports = mongoose.model('User' , UserSchema);