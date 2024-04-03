import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../.env") });

import {
	patchPgForTransactions,
	unpatchPgForTransactions,
	startTransaction,
	rollbackTransaction,
} from "pg-transactional-tests";

import { readFile } from "fs/promises";
import db, { disconnectDb } from "../db.js";

beforeAll(async () => {
	// Set up pg-transaction-test that make sure the database is rolled back to the start after each run.
	patchPgForTransactions();

	// Load the schema file at the start of the tests. This should clear out the database and re-initialize with the default set of data
	const schemaSql = await readFile(
		path.resolve(__dirname, "../../db/initdb.sql"),
		"utf8"
	);
	await db.query(schemaSql);
	await startTransaction();
});

beforeEach(startTransaction);
afterEach(rollbackTransaction);

// rollback transaction after all and stop the db connection:
afterAll(async () => {
	await rollbackTransaction();
	unpatchPgForTransactions();
	disconnectDb();
});
