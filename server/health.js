import { Router } from "express";

const router = Router();

router.get("/status", (_, res) => {
	res.json({ ok: "ok" });
});

export default router;
