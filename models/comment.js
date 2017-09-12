var mongoose = require("mongoose");

var commentSchema = mongoose.Schema ({
  text: String,
  author: String
});
                        //Singular name of model | Schema
module.exports = mongoose.model("Comment", commentSchema);
