const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { check, validationResult } = require("express-validator");
const videos = require("./exampleresponse.json");

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
// let videos = [];
app.use(express.json());

// GET "/"
app
	.route("/")
	.get((req, res) => {
		res.json(videos);
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
			res.json(videos[videos.length - 1].id);
		} else {
			res.json({
				result: "failure",
				message: "Video could not be saved",
			});
		}
	});

app.listen(port, () => console.log(`Listening on port ${port}`));
