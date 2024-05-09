import { Router } from "express";
import db from "./db.js";
const router = Router();

router.get("/videos", async (_, res) => {
	try {
		const result = await db.query("SELECT * FROM videos");
		res.json(result.rows);
	} catch (error) {
		console.error("Error happened while getting videos: " + error);
		res
			.status(500)
			.json({ success: false, error: "Could not connect to the database" });
	}
});

router.post("/videos", async (req, res) => {
	try {
		const { title, src } = req.body;
		const newVideo = await db.query(
			"INSERT INTO videos (title, src) VALUES ($1, $2) RETURNING *",
			[title, src]
		);
		const insertedVideo = newVideo.rows[0];

		res.status(200).json(insertedVideo);
	} catch (error) {
		console.error("Error during insertion into DB:", error.message);
		res.status(500).send("Error during insertion: " + error.message);
	}
});

router.delete("/videos/:id", async (req, res) => {
	const idOfVideo = Number(req.params.id);
	try {
		const deletedVideo = await db.query("DELETE FROM videos WHERE id=$1", [
			idOfVideo,
		]);
		if (deletedVideo.rowCount === 0) {
			console.log("not found to delete");
			res.status(404).json({ success: false, status: "Video not found" });
		} else {
			console.log("succ. deleted");
			res.status(200).json();
		}
	} catch (error) {
		console.error("This is the error happened: " + error);
		res.status(500).json({ success: false, error: "Internal server error" });
	}
});

export default router;
