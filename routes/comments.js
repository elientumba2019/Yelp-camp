var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");



//Comments New
router.get("/new", isLoggedIn, function(req, res){
    // find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});





//Comments Create
router.post("/",isLoggedIn,function(req, res){
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
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               console.log(comment);
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});




/*****************  Edit comment ********************** */
//Edit Comment route
router.get('/:comment_id/edit' , (req , res) =>{
    Comment.findById(req.params.comment_id , (err , foundComment) =>{
        if(err){
            res.redirect('back');
        }
        else{
            res.render('comments/edit' , {campground_id : req.params.id , comment : foundComment});
        }
    });
   
});





/*******************update comment ***************** */
router.put('/:comment_id' , (req , res) =>{
    Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment , (err, updatedComment) =>{
        if(err){
            res.redirect('back');
        }
        else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});




/***********************Delete comment route ********************* */
router.delete('/:comment_id' , (req , res) =>{
    //find Comment and remove
    Comment.findByIdAndRemove(req.params.comment_id , (err) =>{
        if(err){
            res.redirect('back');
        }
        else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})




//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;