import { Router } from "express";
import db from "./db.js";
const router = Router();

router.get("/videos", async (_, res) => {
    try {
        const result = await db.query("SELECT 'ok' ok");
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({
			
            error: "Database connection error",
            message: error.message
        });
    }
});

export default router;
