const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("posts")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error getting posts!", error: err });
    });
});

router.get("/:id", await, (req, res) => {
  db("posts")
    .where("/:id", req.params.id)
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json({ message: "invalid ID", error: err });
    });
    const { id } = req.params;

    try {
        const [post] = await db('posts').where({ id });

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Bad ID!' });
        }
    } catch (err) {
        res.status(500).json({ message: 'db error!', error: err });
    }
});

router.post("/", async, (req, res) => {
    const newPost = req.body;
    try {
        const sql = await db('posts').insert(newPost).toString();
        console.log(sql);
        const post = await db('posts').insert(newPost);
        res.status(201).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error posting!', error: err });
    }
});

router.put("/:id", async, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const count = await db('posts').update(changes).where({ id });
        
        if (count) {
            res.json({ updated: count });
        } else {
            res.status(404).json({ message: "Invalid ID!" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating record!", error: err });
    }
});

router.delete("/:id", async, (req, res) => {
    const { id } = req.params;

    try {
        const count = await db('posts').where({ id }).del();

        if (count) {
            res.json({deleted: count})
        } else {
            res.status(404).json({ message: "Invalid ID!", error: err });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting record!", error: err });
    }
});

module.exports = router;
