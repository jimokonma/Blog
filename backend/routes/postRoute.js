const router = require("express").Router();
const PostModel = require("../models/postModel");

// Get All Post
router.get("/", (req, res) => {
  PostModel.find()
    .then((posts) => {
      res.json(posts || "No data available in the db");
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

// Get Single Post
router.get("/:id", (req, res) => {
  PostModel.findById(req.params.id)
    .then((post) => {
      res.json(post || "Post not Found");
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

//Add New Post
router.post("/", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;

  const newPost = new PostModel({
    title: title,
    body: body,
    comments: [],
  });

  newPost
    .save()
    .then(() => {
      res.json("post added");
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

// Edit Post
router.patch("/:id", (req, res) => {
  const title = req.body.title;
  const body = req.params.id;

  PostModel.findById(req.params.id)
    .then((post) => {
      (post.title = title), (post.body = body);
      post
        .save()
        .then(() => {
          res.json("post updated successfully");
        })
        .catch((err) => {
          res.status(400).json("Error: " + err);
        });
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

// Delete Post
router.delete("/:id", (req, res) => {
  PostModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json("Deleted post successfully");
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

// Add Comment
router.patch("/comment/:id", (req, res) => {
  PostModel.findById(req.params.id)
    .then((data) => {
      data.comments.push({ body: req.body.body });

      data
        .save()
        .then(() => {
          res.json("Comment Added");
        })
        .catch((err) => {
          res.status(400).json("Error: " + err);
        });
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

// Get Comments
router.get("/comment/:id", (req, res) => {
  PostModel.findById(req.params.id)
    .then((data) => {
      if (data.comments) {
        res.json(data.comments);
      } else {
        res.json("no comments found");
      }
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});
module.exports = router;
