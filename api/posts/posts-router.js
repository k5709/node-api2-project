// implement your posts router here
const express = require("express");

const Posts = require("./posts-model.js");

const router = express.router();

// router.get("/api/posts", (req, res) => {

// })
router.get("/", (req, res) => {
  res.send("hello world");
});
