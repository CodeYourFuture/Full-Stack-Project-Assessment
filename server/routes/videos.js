const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    const rs = await pool.query("SELECT * FROM videos");

    res.json(rs.rows);
});

router.post("/", auth, async (req, res) => {
    const video = {
        title: req.body.title,
        url: req.body.url
    };

    try {
        await pool.query("INSERT INTO videos (title, url) VALUES($1, $2)", [video.title, video.url]);
        const rs = await pool.query("SELECT id from videos ORDER BY id DESC LIMIT 1");

        res.json({ id: rs.rows[0].id });
    } catch (error) {
        console.log(error.message);
        res.json({
            result: "failure",
            message: "Video could not be saved"
        });
    }
});

router.patch("/:id/inc-rating", auth, async (req, res) => {
    const videoId = +req.params.id;

    try {
        await pool.query("UPDATE videos SET rating = (rating + 1) WHERE id = $1", [videoId]);

        res.json({});
    } catch (error) {
        res.json({
            result: "failure",
            message: "Video could not be deleted"
        });
    }
});

router.patch("/:id/dec-rating", auth, async (req, res) => {
    const videoId = +req.params.id;

    try {
        await pool.query("UPDATE videos SET rating = (rating - 1) WHERE id = $1", [videoId]);

        res.json({});
    } catch (error) {
        res.json({
            result: "failure",
            message: "Video could not be deleted"
        });
    }
});

router.delete("/:id", auth, async (req, res) => {
    const videoId = +req.params.id;

    try {
        await pool.query("DELETE FROM videos WHERE id = $1", [videoId]);

        res.json({});
    } catch (error) {
        res.json({
            result: "failure",
            message: "Video could not be deleted"
        });
    }
});

module.exports = router;