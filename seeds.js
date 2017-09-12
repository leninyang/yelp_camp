var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
  {
    name: "Bear Creek",
    image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    name: "Desert Hill",
    image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    name: "Happy Valley",
    image: "https://farm9.staticflickr.com/8148/7626387258_ce643254d3.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }
]

function seedDB() {
  //Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("Removed Campgrounds");
    //Loop through array of seed data and add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          //Create a comment
          Comment.create(
            {
              text:"This place is great, but I wish there was internet",
              author: "Homer"
            }, function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment");
              }
            });
          }
        });
      });
    });
  };

  // Sends seedDB function to app.js
  module.exports = seedDB;
