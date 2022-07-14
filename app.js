//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is a blog"
const aboutContent = "A student studying Computer Sciences at UW Madison"
const contactContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."

const app = express();
const posts = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", 
  { 
    homeContent: homeStartingContent,
    posts: posts
  }
    );
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/posts/:topic", (req, res) => {
  let ifFound = false;

  const paramsTitle = _.lowerCase(req.params.topic);
 
  posts.forEach((post) => {
    const postsArrTitle = _.lowerCase(post.title);

    if(postsArrTitle === paramsTitle) {
      ifFound = true;
      console.log("match found!");

      res.render("post", 
      {
        title: postsArrTitle,
        content: post.content
      });
    }
  });

  if(!ifFound){
    console.log("not found");
  }

  
});

app.post("/compose", (req, res) => {
  const post = {
  title: req.body.title,
  content: req.body.postBody
  };
  posts.push(post);

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
