var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground")
var Comment = require("../models/comment")

//==================================
// COMMENTS ROUTES & NESTED ROUTES
//==================================

// NEW ROUTE
router.get("/new", isLoggedIn, function(req, res) {
  // FIND CAMPGROUND ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      // RENDER FORM
      res.render("comments/new", {campground: campground});
    }
  })
});

// CREATE ROUTE
router.post("/", isLoggedIn, function(req, res) {
  //FIND CAMPGROUND BY ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campground")
    } else {
      // CREATE A NEW COMMENT
          //COMBINED NAME ATTRIBUTE USING commnet[]
          // var text = req.body.text <--- No need for that anymore
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          // ASSOCIATE COMMENT TO CAMPGROUND - BY PUSHING COMMENT TO CAMPGROUND
          campground.comments.push(comment);
          campground.save();
          // REDIRECT TO CAMPGROUND SHOW PAGE
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  })
});

//MIDDLEWARE
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};


module.exports = router;
