const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Post = require("./models/post");
const Contact = require("./models/contacts");

const app = express();

app.set("view engine", "ejs");

const PORT = 3000;
const db = "mongodb+srv://Yahor:lantirn1994@cluster0.chix9ce.mongodb.net/node-blog?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then((res) => console.log("Connect to DB"))
  .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.use(express.urlencoded({ extended: false }));

app.use(express.static("styles"));

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.get("/contacts", (req, res) => {
  const title = "Contacts";
  Contact.find()
    .then((contacts) => res.render(createPath("contacts"), { contacts, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.get("/posts/:id", (req, res) => {
  const title = "Post";
  const post = {
    id: "1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.",
    title: "Post title",
    date: "05.05.2021",
    author: "Yahor",
  };
  res.render(createPath("post"), { title, post });
});

app.get("/posts", (req, res) => {
  const title = "Posts";
  const posts = [
    {
      id: "1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.",
      title: "Post title",
      date: "05.05.2021",
      author: "Yahor",
    },
  ];
  res.render(createPath("posts"), { title, posts });
});

app.post("/add-post", (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => res.send(result))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.get("/add-post", (req, res) => {
  const title = "Add Post";
  res.render(createPath("add-post"), { title });
});

app.use((req, res) => {
  const title = "Error Page";
  res.status(404).render(createPath("error"), { title });
});
