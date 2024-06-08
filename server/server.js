import "dotenv/config";

import http from "node:http";
import { connectDb, disconnectDb } from "./db.js";

import app from "./app.js";

// after configuring the routes we can now create the node server and start it up
const server = http.createServer(app);
const port = parseInt(process.env.PORT ?? "3000", 10);

//GET ALL VIDEOS
app.get("/api/videos", (request, response) => {
	console.log("api videos");
	db.query("SELECT * FROM videos")
		.then((result) => {
			console.log(result);
			response.status(200).json({ videos: result.rows });
		})
		.catch((err) => {
			console.log(err);
		});
});

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	console.log(`listening on: ${bind}`);
});

process.on("SIGTERM", () => server.close(() => disconnectDb()));

connectDb().then(() => server.listen(port));
