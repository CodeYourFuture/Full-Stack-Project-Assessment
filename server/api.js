import { Router } from "express";
import db from "./db.js";
const router = Router();

router.get("/videos", async (_, res) => {
	const result = await db.query("SELECT * FROM videos");
	res.json(result.rows);
});

router.post("/videos", async (req, res) => {
	try {
		const { title, src } = req.body;
		const newVideo = await db.query(
			"INSERT INTO videos (title, src) VALUES ($1, $2)",
			[title, src]
		);
		res.status(200).send("New Video Inserted Successfully");
	} catch (error) {
		console.error("Error during insertion into DB:", error.message);
		res.status(500).send("Error during insertion: " + error.message);
	}
});

export default router;
