import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (!process.env.LAMBDA_TASK_ROOT) {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	dotenv.config({ path: path.join(__dirname, "../.env") });
}

import pg from "pg";
const { Pool } = pg;

// make sure we run automated tests against a different database to production
const databaseUrl =
	process.env.NODE_ENV == "test"
		? process.env.TEST_DATABASE_URL
		: process.env.DATABASE_URL;
console.log(databaseUrl);
const pool =
	databaseUrl &&
	new Pool({
		connectionString: databaseUrl,
		connectionTimeoutMillis: 5000,
		ssl:
			databaseUrl.includes("localhost") || databaseUrl.includes("flycast")
				? false
				: { rejectUnauthorized: false },
	});

export const connectDb = async () => {
	if (!pool) {
		return;
	}

	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		console.log(err);
		throw err;
	}
	console.log(`Postgres connected to ${client.database}`);
	client.release();
};

export const disconnectDb = () => {
	if (!pool) {
		return;
	}
	pool.end();
};

export default {
	query: (...args) => {
		if (!pool) {
			return;
		}
		return pool.query.apply(pool, args);
	},
};
