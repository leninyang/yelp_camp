var express = require('express');
var app = express();
var bodyParser = require("body-parser");

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
// DON'T HAVE TO add .ejs
app.set("view engine", "ejs");
var port = process.env.PORT || 3000;

var campgrounds = [
  {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
  {name: "Granite Hill", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"},
  {name: "Mountain Hill", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"}
];

// GET ROUTE | LANDING PAGE
app.get('/', function(req, res) {
  res.render("landing")
})

// Show all Campgrounds
app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {campgrounds: campgrounds});
});

// Create a New Campground
app.post("/campgrounds", function(req, res) {
  //Get Data from form and add to campgrounds array
  var name = req.body.name
  var image = req.body.image
  var newCampGround = {name: name, image: image}
  campgrounds.push(newCampGround);
  //Redirect back to campgrounds page
  res.redirect('/campgrounds');
});

// Shows the form that will send data to POST Route
app.get("/campgrounds/new", function(req, res){
  res.render("new")
})

app.listen(port, function() {
  console.log('YelpCamp Server Has Started');
});
