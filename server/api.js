import { Router } from "express";
import db from "./db.js";
const router = Router();

router.get("/videos", async (_, res) => {
	try{
		const result = await db.query("SELECT * FROM videos;");
		res.json(result.rows);
	}
	catch(error){
		console.error("Database connection error:", error);
		res.status(500).json({success:false, error: "Could not connect to the database"});
	}
});

export default router;
