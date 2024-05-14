import express from "express";

const router = express.Router();

// Health check route
router.get("/", (_, res) => {
	res.sendStatus(200);
});

export default router;
