import { Router } from "express";
import db from "./db.js";
const router = Router();

router.get("/videos", async (_, res) => {
	const result = await db.query("SELECT * FROM videos");
	console.log(result.rows, "result in api.js----------");
	res.json(result.rows);
});

export default router;
