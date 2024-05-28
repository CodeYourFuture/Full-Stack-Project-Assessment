import { Router } from "express";
import db from "./db.js";
const router = Router();

router.get("/videos", async (_, res) => {
	try {
		const result = await db.query("SELECT * FROM videos");

		const videos = result.rows.map((video) => {
			return {
				id: video.id,
				title: video.title,
				url: video.src,
			};
		});

		const jsonResult = {
			success: true,
			total: result.rowCount,
			data: videos,
		};

		res.status(200).json(jsonResult);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			status: 500,
			message: "Could not connect to the database",
		});
	}
});

router.post("/videos", async (req, res) => {
	const { title, url } = req.body;
	const addVideoInDatabase = await db.query(
		"INSERT INTO videos (title, src) VALUES ($1, $2) RETURNING *",
		[title, url]
	);
	res.json({
		success: true,
		status: 201,
		data: addVideoInDatabase.rows[0],
	});
});
router.delete("/videos", async (req, res) => {
	const { id } = req.body;
	try {
		const result = await db.query("DELETE FROM videos WHERE id = $1", [id]);
		res.status(200).json("video deleted successfully.");
	} catch (error) {
		console.error(err.message);
	}
});

router.get("/health", (_, res) => {
	res.json({ status: "ok" });
});

export default router;
