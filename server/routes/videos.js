const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const { scrape } = require("../functions/scrape")
const validate = require("../validations/videos");
const auth = require("../middleware/auth");

router.get("/user/:uId", auth, async (req, res) => {
    const rs = await pool.query("SELECT * FROM videos WHERE u_id = $1", [req.params.uId]);
    const videos = rs.rows;

    res.json({ message: "success", videos });
});

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const videoId = req.body.url.split('watch?v=')[1];

    try {
        const videoDetails = await scrape(videoId);
        if (!videoDetails.uploadDate) return res.status(404).json({
            result: "failure",
            message: "Video not found."
        });

        const rs = await pool.query("INSERT INTO videos (u_id, video_id, title, views, upload_date, author) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [
            req.body.userId,
            videoId,
            videoDetails.title,
            videoDetails.views,
            videoDetails.uploadDate,
            videoDetails.author
        ]);

        res.json(rs.rows[0]);
    } catch (error) {
        res.status(500).json({
            result: "failure",
            message: error.message
        });
    }
});

router.patch("/:id/inc-rating", auth, async (req, res) => {
    const videoId = +req.params.id;

    try {
        await pool.query("UPDATE videos SET rating = (rating + 1) WHERE id = $1", [videoId]);

        res.json({});
    } catch (error) {
        res.status(500).json({
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
        res.status(500).json({
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
        res.status(500).json({
            result: "failure",
            message: "Video could not be deleted"
        });
    }
});

module.exports = router;