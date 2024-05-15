import express from "express";
import apiRouter from "./api.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

app.use(express.json());
// api calls are all under /api and are handled in api.js
app.use("/api", apiRouter);

// everything that is not an API call is likely the frontend react app, so make sure we route the frontend app there.
// This will allow us to access the React frontend on the same link as the backend.

// Error handler for JSON parse errors
app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		return res.status(400).json({ message: "Invalid JSON format" });
	}
	next(err);
});

// General error handler
app.use((err, req, res, next) => {
	res.status(500).json({ message: "An unexpected error occurred" });
	next(err);
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticDir = path.join(__dirname, "static");
app.use(express.static(staticDir));
app.use((req, res, next) => {
	if (req.method === "GET" && !req.url.startsWith("/api")) {
		return res.sendFile(path.join(staticDir, "index.html"));
	}
	next();
});

export default app;
