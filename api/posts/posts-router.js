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
router.put("/api/posts", (req, res) => {});
router.delete("/api/posts", (req, res) => {});
router.get("/api/posts/:id/messages", (req, res) => {});

module.exports = router;
