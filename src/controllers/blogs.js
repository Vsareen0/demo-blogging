const Blog = require("../models/Blog.model");

exports.blogs = (req, res) => {
  Blog.find({}).exec((err, data) => {
    if (err || !data) return res.status(400).send("No Blog posts found.");
    res.status(200).json({ data });
  });
};

exports.addBlog = async (req, res) => {
  const { title, post } = req.body;
  const username = req.cookies["username"];

  const newPost = new Blog({
    title,
    post,
    author: username,
  });

  try {
    await newPost.save();
    res.status(200).send("New Blog added !");
  } catch (err) {
    res.status(400).send(`Faced some error: ${err.message}`);
  }
};

exports.updateBlog = async (req, res) => {
  const data = await Blog.find({ _id: req.params.id });
  const author = data[0].author;
  if (author == req.cookies["username"]) {
    const { title, post } = req.body;

    Blog.updateOne({ _id: req.params.id }, { title, post }, (err, result) => {
      if (err) res.status(400).send("Error while updating..");
      res.status(200).send("Successfuly Updated the blog !");
    });
  } else {
    res
      .status(400)
      .send(
        "There are not so much loopholes you expected buddy ! You cannot change someone's blog. "
      );
  }
};

exports.removeBlog = async (req, res) => {
  const data = await Blog.find({ _id: req.params.id });
  const author = data[0].author;
  if (author == req.cookies["username"]) {
    Blog.deleteOne({ _id: req.params.id }, (err, result) => {
      if (err) res.status(400).send("Error while updating..");
      res.status(200).send("Successfuly Deleted the blog !");
    });
  } else {
    res
      .status(400)
      .send(
        "There are not so much loopholes you expected buddy ! You cannot change someone's blog. "
      );
  }
};
