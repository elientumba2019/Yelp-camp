var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var campArray = require('./temporaryData');//temp data


//setting the view engine
app.set("view engine" , "ejs");
//static express file
app.use(express.static('public'))
//use body parser
app.use(bodyParser.urlencoded({extended : true}));




//landing page
app.get('/' , function(req , res){
    res.render("landing");
});




//campground routes
app.get('/campgrounds' , function(req , res){
    res.render("campgrounds" , {campgrounds  : campArray});
});




//route for displaying the form that will be used to display the form
app.get('/campgrounds/new' , function(req , res){
    res.render('newCamp');
});




//post route for adding a new campground
app.post('/campgrounds' , function(req , res){

    //get data from the form
    res.send("Post route hehe");

    //redirect to the home page
});



//listening
app.listen(3000 , function(){
    console.log('App listening : Server online');
})