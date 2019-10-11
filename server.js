//get all REQUIREMENTS!!!!
//scrapwr and
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
let PORT = 3000;
const app = express();

// morgan - get logger/ app.use
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect mongo db (see examle)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo1";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//create GET route for scrape
app.get("/scrape", function(req, res) {
  axios.get("http://www.echojs.com/").then(function(response) {
    const $ = cheerio.load(response.data);

//get h2 article tag
$("article h2").each(function(i, element) {
    //save empty res object - {}
    const result = {};

    // Add txt w/ all href links, and save them as properties of the result object
    result.title = $(this)
    .children("a")
    .text();
    result.link = $(this)
    .children("a")
    .attr("href");

//create article from db res and allow err when err
db.Article.create(result)
    .then(function(dbArticle) {})
    .catch(function(err) {});
});

//scrape completed!
res.send("Scrape Complete");
});
});

// Route for getting all articles from the db
app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {t
      res.json(err);
    });
});


//route for getting id for target article
app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {y
  db.feedback.create(req.body)
    .then(function(feedbackdb) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: feedbackdb._id }, { new: true });
    })

.then(function(dbArticle) {
    //let client know errr or success!!
    res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

