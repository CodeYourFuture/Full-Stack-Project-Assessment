import "dotenv/config";

import http from "node:http";
import { connectDb, disconnectDb } from "./db.js";

import app from "./app.js";
import { error } from "node:console";

// after configuring the routes we can now create the node server and start it up
const server = http.createServer(app);
const port = parseInt(process.env.PORT ?? "3000", 10);

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	console.log(`listening on: ${bind}`);
});

process.on("SIGTERM", () => server.close(() => disconnectDb()));

connectDb()
	.then(() => server.listen(port))
	.catch((error) => console.error("Fail to connect", error))
	.finally(console.log("connecteds"));
