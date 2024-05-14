import { Router } from "express";

const router = Router();

// Health check route
router.get("/status", (_, res) => {
	res.sendStatus(200);
});

export default router;
