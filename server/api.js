import { Router } from "express";
import db from "./db.js";
const router = Router();

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

export default router;
