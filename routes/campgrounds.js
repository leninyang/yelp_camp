var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")

// ==================
// CAMPGROUNDS ROUTES
// ==================

// INDEX ROUTE - SHOWS ALL CAMPGROUNDS
router.get("/", function(req, res) {
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
                              // Pass in campgrounds & current user
      res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
    }
  });
});

// CREATE ROUTE
// Adds a New Campground to DB
router.post("/", function(req, res) {
  //Get Data from form and add to campgrounds array
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var newCampGround = {name: name, image: image, description: desc}
  // Create a new campground and save to DB
  Campground.create(newCampGround, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //Redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});

// NEW ROUTE
// Show form to create a new campground
router.get("/new", function(req, res){
  res.render("campgrounds/new")
})

// SHOW ROUTE
// Shows more info about one campground
router.get("/:id", function(req, res) {
  //Find the campground with provided ID, populate commentso on that campground then execute query
  Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      //Render show template with that camground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});


module.exports = router;
