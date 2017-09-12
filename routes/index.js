var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROOT ROUTE | LANDING PAGE
router.get('/', function(req, res) {
  res.render("landing")
})

//==================================
// AUTHENTIFICATION ROUTES
//==================================

// REGISTER ROUTE
// Shows Register Form
router.get("/register", function(req, res) {
  res.render("register");
});

// Handles Register Logic
router.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      // Use return to end at this point
      // If there is an error render register form
      return res.render("register")
    }
    passport.authenticate("local")(req, res, function() {
        res.redirect("/campgrounds");
    });
  });
});



// LOGIN ROUTE
// Shows Login Form
router.get("/login", function(req, res) {
  res.render("login");
});

// Handles Login Logic
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res) {
});



// LOGOUT ROUTE
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
});




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = router;
