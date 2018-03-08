var express = require('express');
var app = express();

var campArray = require('./temporaryData');


//setting the view engine
app.set("view engine" , "ejs");
//static express file
app.use(express.static('public'))



//landing page
app.get('/' , function(req , res){
    res.render("landing");
});




//campground routes
app.get('/campgrounds' , function(req , res){
    res.render("campgrounds" , {campgrounds  : campArray});
});




//post route for adding a new campground
app.post('/campgrounds' , function(req , res){

    //get data from the form

    //redirect to the home page
});



//listening
app.listen(3000 , function(){
    console.log('App listening : Server online');
})