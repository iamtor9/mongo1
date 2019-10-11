var mongoose = require("mongoose");
let Schema = mongoose.Schema;

//Article constructor
let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  //id for comment with reference to comment model
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// Mongoose article model
let Article = mongoose.model("Article", ArticleSchema);
// Exporting the article model
module.exports = Article;