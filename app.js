var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds"),
    passport    = require('passport'),
    localStrategy = require('passport-local'),
    User = require('./models/user'),
    expressSession = require('express-session');


    //step 1 importing 4 stuff for authentication

    
mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


/******* passport configuration ********** */
//step 3 do the express  session configuration
app.use(expressSession({
    secret : "elientumba hello",
    resave : false,
    saveUninitialized : false
}));

//step 4 do passport initialize
app.use(passport.initialize());


//step 5 do passport session
app.use(passport.session());

//step 6 do passport use with user authenticate from the plugin
passport.use(new localStrategy(User.authenticate()));

//step 7 passport serialize
passport.serializeUser(User.serializeUser());


//step 8 do passport deserialize
passport.deserializeUser(User.deserializeUser());





app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
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
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
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
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
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


// ====================
// COMMENTS ROUTES
// ====================

app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});



//step 9 adding an auth route
//shows the form
app.get('/register' , (req , res) =>{
    res.render("register");
});



//step 10 another route format post
//handle signup logic
app.post('/register' , (req , res) =>{
    
    var usernameUser = req.body.username;
    var passwordUser = req.body.password;

    //step 11 using register from pass-local mongoose to register the user with hash
    var newUser = new User({username : usernameUser})

    User.register(newUser, passwordUser , (err , user) => {
        if(err){
            console.log(err);
            return res.render('register');
        }

        //step 12 authenticate with passport(log them in)
        passport.authenticate('local')(req , res , () => {
            res.redirect('/campgrounds');
        });
        
    });
});




app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});