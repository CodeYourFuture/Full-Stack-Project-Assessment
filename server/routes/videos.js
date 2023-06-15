const express = require("express");
const router = express.Router();
const pool = require("../db/db");
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

    const video = {
        userId: req.body.userId,
        title: req.body.title,
        url: req.body.url
    };

    try {
        const rs = await pool.query("INSERT INTO videos (u_id, title, url) VALUES($1, $2, $3) RETURNING *", [video.userId, video.title, video.url]);

        res.json(rs.rows[0]);
    } catch (error) {
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