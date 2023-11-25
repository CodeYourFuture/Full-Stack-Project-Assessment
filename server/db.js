import "dotenv/config";

import { Pool } from "pg";

// make sure we run automated tests against a different database to production
const databaseUrl = (process.env.NODE_ENV == "test") ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

const pool = databaseUrl ?
	new Pool({
	connectionString: databaseUrl,
	connectionTimeoutMillis: 5000,
	ssl: databaseUrl.includes("localhost")
		? false
		: { rejectUnauthorized: false },
}) : null;

export const connectDb = async () => {
	if (!pool)
		return;

	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log(`Postgres connected to ${client.database}`);
	client.release();
};

export const disconnectDb = () => {
	if (!pool) return;
	pool.end();
}

export default {
	query: (...args) => {
		if (!pool)
			return;
		return pool.query.apply(pool, args);
	},
};
