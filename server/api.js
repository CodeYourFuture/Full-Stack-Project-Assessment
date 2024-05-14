import { Router } from "express";
import db from "./db.js";
const router = Router();

router.get("/videos", async (_, res) => {
	const result = await db.query("SELECT * FROM videos");
	res.json(result.rows);
});

router.get("/health", async (_, res) => {
	res.sendStatus(200);
});

export default router;
