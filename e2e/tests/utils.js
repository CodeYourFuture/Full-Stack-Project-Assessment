import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "fs/promises";
import path from "path";
import db from "../../server/db";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function resetDatabase() {
	// Make sure we load up the test database, but only if we started the app in test mode, not to accidentally delete prod data
	if (process.env.NODE_ENV === "test") {
		const schemaSql = await readFile(
			path.resolve(__dirname, "../../db/initdb.sql"),
			"utf8"
		);
		await db.query(schemaSql);
	}
}

resetDatabase();

export default resetDatabase;
