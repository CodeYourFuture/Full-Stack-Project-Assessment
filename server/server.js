const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { check, validationResult } = require("express-validator");
const videos = require("./exampleresponse.json");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];
app.use(express.json());
app.use(cors());

const pool = new Pool({
	user: process.env.DB_User,
	host: "localhost",
	database: "video_recommendation",
	password: process.env.DB_Password,
	port: 5432,
});
// GET "/"

app
	.route("/")
	.get((req, res) => {
		console.log("You're in the DB!");
		pool
			.query("SELECT * FROM videos")
			.then((result) => res.json(result.rows))
			.catch((err) => console.error(err));
	})
	.post([check("url").isURL()], (req, res) => {
		const errors = validationResult(req);
		const { title, url } = req.body;
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		} else if (title && url) {
			videos.push({
				id: Math.ceil(Math.random() * videos.length * 125),
				title: title,
				url: url,
			});
			res.json({ id: videos[videos.length - 1].id });
		} else {
			res.json({
				result: "failure",
				message: "Video could not be saved",
			});
		}
	});

app
	.route("/:id")
	.get([check("id").exists()], (req, res) => {
		const errors = validationResult(req);
		const strId = req.params.id;
		const id = parseInt(strId);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		} else if (!videos.some((video) => video.id === id)) {
			res.status(400).json({
				error: `No video with id of ${id}`,
			});
		} else {
			const result = videos.filter((video) => video.id === id);
			res.json(result);
		}
	})
	.delete([check("id").exists()], (req, res) => {
		const errors = validationResult(req);
		const strId = req.params.id;
		const id = parseInt(strId);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		} else if (!videos.some((video) => video.id === id)) {
			res.status(400).json({
				result: "failure",
				message: "Video could not be deleted",
			});
		} else {
			const result = videos.filter((video) => video.id !== id);
			res.json(result);
		}
	});

app.listen(port, () => console.log(`Listening on port ${port}`));
