var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});


//CREATE - add new campground to DB
router.post("/", isLoggedIn ,  function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var authorU = {
        id : req.user._id,
        username : req.user.username
    };

    var newCampground = {name: name, image: image, description: desc , author : authorU}
   



    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});




//NEW - show form to create new campground
router.get("/new", isLoggedIn , function(req, res){
   res.render("campgrounds/new"); 
});



// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//Edit camp route
router.get('/:id/edit' , (req, res) =>{

    //getting the camp
    Campground.findById(req.params.id , (err , foundCamp) =>{
        if(err){
            res.render('/campgrounds');
        }
        else{
            res.render('campgrounds/edit' , {campground : foundCamp});
        }
    });
});



//update camp route
router.put('/:id' , (req, res) =>{

    var camp = req.body.campground;

    //find camp update if
    Campground.findByIdAndUpdate(req.params.id , camp , (err , updatedCamp) =>{
        if(err){
            res.redirect('/campgrounds');
        }
        else{
            res.redirect('/campgrounds' + req.param.id);
        }
    });

    //refirect to the main page

})


//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;

