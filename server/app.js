import express from "express";
import apiRouter from "./api.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();




app.use(express.json());
// api calls are all under /api and are handled in api.js
app.use("/api", apiRouter);

// health-check call will help during deployment determine if the system has been deployed successfully
app.use("/health", (_, res) => res.sendStatus(200));

// everything that is not an API call is likely the frontend react app, so make sure we route the frontend app there.
// This will allow us to access the React frontend on the same link as the backend.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticDir = path.join(__dirname, "../client");
app.use(express.static(staticDir));
app.use((req, res, next) => {
	if (req.method === "GET" && !req.url.startsWith("/api")) {
		return res.sendFile(path.join(staticDir, "index.html"));
	}
	next();
});

export default app;
