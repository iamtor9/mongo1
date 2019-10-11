var mongoose = require("mongoose");

//schema constructor
var Schema = mongoose.Schema;

//schema constructor creates Schema object-- custom name
// This is similar to a Sequelize model
var feedbackSchema = new Schema({
  title: String,
  body: String
});

//create model with mongoose method from the feedbackSchema
var feedback = mongoose.model("feedback", feedbackSchema);
  module.exports = feedback;