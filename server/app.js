const express = require("express");
const Video = require("./models/video");

const app = express();
const mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

mongoose
	.connect("mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST + "/" + process.env.MONGO_DATABASE_NAME)
	.then(() => {
		console.log("Successfully connected to MongoDB Atlas!");
	})
	.catch((error) => {
		console.log("Unable to connect to MongoDB Atlas!");
		console.error(error);
	});

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.post("/videos", (req, res, next) => {
	const video = new Video({
		title: req.body.title,
		url: req.body.url,
		rating: 0,
		votes: 0,
	});
	video
		.save()
		.then(() => {
			res.status(201).json({
				message: "Videos saved successfully!",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
});

app.get("/videos/:id", (req, res, next) => {
	Video.findOne({
		_id: req.params.id,
	})
		.then((video) => {
			res.status(200).json(video);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
});

app.get("/videos", (req, res, next) => {
	Video.find()
		.then((videos) => {
			res.status(200).json(videos);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
});

app.delete("/videos/:id", (req, res, next) => {
	Video.deleteOne({_id: req.params.id})
		.then(() => {
			res.status(200).json({
				message: "Deleted",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
});

module.exports = app;
