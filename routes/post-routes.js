const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const createPath = require("../helpers/create-path");

// for one post--------------------------------------------------------------------------------------------------

router.get("/posts/:id", (req, res) => {
  const title = "Post";

  Post.findById(req.params.id)
    .then((post) => res.render(createPath("post"), { title, post }))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

router.delete("/posts/:id", (req, res) => {
  const title = "Post";

  Post.findByIdAndDelete(req.params.id)
    .then((result) => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

router.get("/edit/:id", (req, res) => {
  const title = "Edit Post";

  Post.findById(req.params.id)
    .then((post) => res.render(createPath("edit-post"), { title, post }))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

router.put("/edit/:id", (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(id, { title, author, text })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

// for all posts--------------------------------------------------------------------------------------------------

router.get("/posts", (req, res) => {
  const title = "Posts";
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.render(createPath("posts"), { title, posts }))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

// for add post--------------------------------------------------------------------------------------------------

router.post("/add-post", (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => res.redirect("posts"))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

router.get("/add-post", (req, res) => {
  const title = "Add Post";
  res.render(createPath("add-post"), { title });
});

module.exports = router;
