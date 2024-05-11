import { Router } from "express";
import db from "./db.js";
const router = Router();

router.get("/videos", async (_, res) => {
	const result = await db.query("SELECT * FROM videos");
	res.json(result.rows[0]);
});

router.get("/health", (_, res) => {
	res.json({ status: "ok" });
})

export default router;
