var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');


//connecting to the database
mongoose.connect("mongodb://localhost/yelp_camp");

//setting the view engine
app.set("view engine" , "ejs");
//use body parser
app.use(bodyParser.urlencoded({extended : true}));
//static express file
app.use(express.static('public'))




//schema for the database
var campgroundSchema = new mongoose.Schema({
    name : String,
    image : String
});

var Campground = mongoose.model('Campground' , campgroundSchema);

//test database
/*
Campground.create({
    name : "Hello Camp",
    image : "hello image"
} , function(err , camp){
    if(err){
        console.log(err);
    }
    else{
        console.log(camp);
    }
})
*/




//landing page
app.get('/' , function(req , res){
    res.render("landing");
});




//campground routes
app.get('/campgrounds' , function(req , res){

    //get camps from the DB
    Campground.find({} , function(err , camp){
        if(err){
            console.log(err);
        }
        else{
            //render
            res.render("campgrounds" , {campgrounds  : camp});
        }
    }) 
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