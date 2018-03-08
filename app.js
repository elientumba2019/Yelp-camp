var express = require('express');
var app = express();


//setting the view engine
app.set("view engine" , "ejs");



//landing page
app.get('/' , function(req , res){
    res.render("landing");
});




//campground routes
app.get('/campgrounds' , function(req , res){
    res.render("Campgrounds")
});


//listening
app.listen(3000 , function(){
    console.log('App listening : Server online');
})