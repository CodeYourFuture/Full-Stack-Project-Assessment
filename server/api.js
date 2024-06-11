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
	console.log("Received request to delete video with ID:", id);
	res.send("video deleted");

// 	try {
// 		// Check if the video exists
// 		const selectResult = await db.query("SELECT * FROM videos WHERE id = $1", [
// 			id,
// 		]);
// 		console.log("Select query result:", selectResult.rows);

// 		if (selectResult.rows.length === 0) {
// 			// If no video found with the given ID, respond with 404
// 			console.log("Video not found for ID:", id);
// 			return res.status(404).json({ error: "Video not found" });
// 		}

// 		// Delete the video
// 		const deleteResult = await db.query("DELETE FROM videos WHERE id = $1", [
// 			id,
// 		]);
// 		console.log("Delete query result:", deleteResult);

// 		// Respond with 204 No Content to indicate successful deletion
// 		res.status(204).send();
// 	} catch (error) {
// 		console.error("Error deleting video:", error);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// });
// router.delete("/videos/:id", async (req, res) => {
// 	const { id } = req.params;
// 	console.log(id);

// 	db.query(`DELETE * FROM videos WHERE id = ${id}`)
// 		.then((result) => {
// 			console.log(result);
// 			if (result.rows.length === 0) {
// 				return res.status(404).json({ error: "Video not found" });
// 			} else {
// 				res.status(204).send();
// 			}
// 		})
// 		.catch((error) => {
// 			console.log("Error deleting video:", error);
// 			res.status(500).json({ error: "Internal Server Error" });
// 		});
});

export default router;
