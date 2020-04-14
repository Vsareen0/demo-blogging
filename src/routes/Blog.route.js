const express = require("express");
const router = express();
const requiresSignIn = require("../controllers/verifyToken");
const  { blogs, addBlog, updateBlog, removeBlog } = require("../controllers/blogs");

router.get("/blogs", blogs);

router.post("/add/blogs", requiresSignIn, addBlog);

router.put("/edit/blog/:id", requiresSignIn, updateBlog);

router.delete("/remove/blog/:id", requiresSignIn, removeBlog);

module.exports = router;
