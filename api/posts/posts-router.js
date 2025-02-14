// implement your posts router here
const express = require("express");
const Post = require("./posts-model");

const router = express.Router();

router.get("/", async (req, res) => {
  Post.find()
    .then((found) => {
      res.json(found);
    })
    .catch((error) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
        error: error.message,
      });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const id = await Post.findById(req.params.id);
    if (!id) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
    res.json(id);
  } catch (error) {
    res.status(404).json({
      message: "The post with the specified ID does not exist",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Post.insert({ title, contents })
      .then(({ id }) => {
        return Post.findById(id);
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
          error: error.message,
        });
      });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, contents } = req.body;
    const id = await Post.findById(req.params.id);
    if (!id) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else if (!title || !contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      await Post.update(req.params.id, req.body);
      const updatedPostID = await Post.findById(req.params.id);
      res.status(200).json(updatedPostID);
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "The post information could not be modified" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = await Post.findById(req.params.id);
    if (!id) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      await Post.remove(req.params.id);
      res.json(id);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "The post could not be removed" });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      const postComment = await Post.findPostComments(req.params.id);
      res.json(postComment);
    }
  } catch (error) {
    res.status(500).json({
      message: "The Comments information could not be retrieved",
      error: error.message,
    });
  }
});

module.exports = router;
