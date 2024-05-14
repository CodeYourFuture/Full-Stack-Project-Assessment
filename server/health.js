import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
	res.json({ server: "ok" });
});

export default router;
