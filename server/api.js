import { Router } from "express";
import db from "./db.js";

const router = Router();

//Get all videos
router.get("/videos", async (_, res) => {
	console.log("api videos");
	db.query("SELECT * FROM videos")
		.then((result) => {
			//console.log(result);
			res.status(200).json({ videos: result.rows });
		})
		.catch((error) => {
			console.log(error);
		});
});

// Delete a specific video by ID
router.delete("/videos/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const selectResult = await db.query("SELECT * FROM videos WHERE id = $1", [
			id,
		]);
		//checks if video doesn't exist
		if (selectResult.rows.length === 0) {
			console.log("Video not found for ID:", id);
			return res.status(404).json({ error: "Video not found" });
		}

		// Delete the video
		const deleteResult = await db.query("DELETE FROM videos WHERE id = $1", [
			id,
		]);
		res.status(204).send();
	} catch (error) {
		console.error("Error deleting video:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export default router;
