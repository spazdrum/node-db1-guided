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
      res.status(500).json({ message: "error getting posts", error: err });
    });
});

router.get("/:id", await, (req, res) => {
//   db("posts")
//     .where("/:id", req.params.id)
//     .then((posts) => {
//       res.json(posts);
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "invalid ID", error: err });
//     });
    const { id } = req.params;

    try {
        const [post] = await db('posts').where({ id });

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Bad ID'})
        }
    } catch (err) {
        res.status(500).json({ message: 'db error', error : err })
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
        res.status(500).json({ message: 'error posting', error : err})
    }
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
