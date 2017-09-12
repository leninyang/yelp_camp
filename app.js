var express                  = require('express');
    app                      = express();
    bodyParser               = require("body-parser");
    mongoose                 = require("mongoose");
    passport                 = require("passport");
    LocalStrategy            = require("passport-local");
    Campground               = require("./models/campground");
    Comment                  = require("./models/comment");
    User                     = require("./models/user");
    seedDB                   = require("./seeds");

// REQUIRING ROUTES
var commentRoutes            = require("./routes/comments");
    campgroundRoutes         = require("./routes/campgrounds");
    indexRoutes               = require("./routes/index");

var port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
// ALLOWS SO THAT DONT HAVE TO ADD .ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//Seeds Database with seed data
seedDB();

// PASSPORT CONFIGURATIONS
app.use(require("express-session")({
  secret: "password password",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware that passes in currentuser in every single route
// Used for Show/Hiding links in navbar
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});


// Appends whatever is inside "" to beginning of each route.
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(port, function() {
  console.log('YelpCamp Server Has Started');
});
