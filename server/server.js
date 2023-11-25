import "dotenv/config";

import http from "node:http";
import { connectDb, disconnectDb } from "./db";
import express from "express";
import apiRouter from "./api";
import path from "path";

const app = express();

// api calls are all under /api and are handled in api.js
app.use("/api", apiRouter);

// healthcheck call will help during deployment determine if the system has been deployed successfully
app.use("/health", (_, res) => res.sendStatus(200));

// everything that is not an API call is likely the frontend react app, so make sure we route the frontend app there.
// This will allow us to access the React frontend on the same link as the backend.
const staticDir = path.join(__dirname, "static");
app.use(express.static(staticDir));
app.use((req, res, next) => {
	if (req.method === "GET" && !req.url.startsWith("/api")) {
		return res.sendFile(path.join(staticDir, "index.html"));
	}
	next();
});

// after configuring the routes we can now create the node server and start it up
const server = http.createServer(app);
const port = parseInt(process.env.PORT ?? "3000", 10)

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	console.log(`listening on: ${bind}`);
});

process.on("SIGTERM", () => server.close(() => disconnectDb()));

connectDb().then(() => server.listen(port));
