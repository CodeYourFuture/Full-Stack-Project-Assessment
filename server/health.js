import { Router } from "express";

const router = Router();

router.get("/status", async (_, res) => {
	res.status(200).send("ok");
});

export default router;
