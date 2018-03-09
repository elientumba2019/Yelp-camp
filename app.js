var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');



//setting the view engine
app.set("view engine" , "ejs");
//use body parser
app.use(bodyParser.urlencoded({extended : true}));
//static express file
app.use(express.static('public'))




var campgroundsArray = [
    {
        name : "Elie's camp",
        image : "Elie 's image"
    } , 

    {
        name : "Elie's camp2",
        image : "Elie 's image"
    } , 

    {
        name : "Elie's camp3",
        image : "Elie 's image"
    }
];




//landing page
app.get('/' , function(req , res){
    res.render("landing");
});




//campground routes
app.get('/campgrounds' , function(req , res){
    res.render("campgrounds" , {campgrounds  : campgroundsArray});
});




//route for displaying the form that will be used to display the form
app.get('/campgrounds/new' , function(req , res){
    res.render('newCamp');
});




//post route for adding a new campground
app.post('/campgrounds' , function(req , res){

    //get data from the form
    var nameD = req.body.name;
    var imageD = req.body.image;

    //push data in the array
    var newCamp = {name : nameD , image : imageD};
   campgroundsArray.push(newCamp);

    //redirect to the home page
    res.redirect('/campgrounds');
});



//listening
app.listen(3000 , function(){
    console.log('App listening : Server online');
})