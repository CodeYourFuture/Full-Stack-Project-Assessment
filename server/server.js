import "dotenv/config";

import http from "node:http";
import { connectDb, disconnectDb } from "./db.js";

import app from "./app.js";

// after configuring the routes we can now create the node server and start it up
const server = http.createServer(app);
const port = parseInt(process.env.PORT ?? "3000", 10);

//GET ALL VIDEOS
<<<<<<< HEAD
app.get("/api/videos", (request, response) => {
	console.log("api videos");
	db.query("SELECT * FROM videos")
		.then((result) => {
			console.log(result);
=======
app.get("/videos", (request, response) => {
	db.query("SELECT * FROM videos")
		.then((result) => {
>>>>>>> 829ab2169a5e0d64ed49f70286289d65be659d21
			response.status(200).json({ videos: result.rows });
		})
		.catch((err) => {
			console.log(err);
		});
});

<<<<<<< HEAD
=======

>>>>>>> 829ab2169a5e0d64ed49f70286289d65be659d21
server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	console.log(`listening on: ${bind}`);
});

process.on("SIGTERM", () => server.close(() => disconnectDb()));

connectDb().then(() => server.listen(port));
