import { Builder } from "selenium-webdriver";
import Chrome from "selenium-webdriver/chrome";
import { readFile } from "fs/promises";
import path from "path";
import db, { disconnectDb } from "../../server/db";

let driver = null;

beforeAll(async () => {
	// Make sure we load up the test database
	if (process.env.NODE_ENV === "test") {
		const schemaSql = await readFile(
			path.resolve(__dirname, "../../db/schema.sql"),
			"utf8"
		);
		await db.query(schemaSql);
	}

	// locally we want a Chrome Browser that is visible to make it easier to debug issues.
	// However on GitHub there's no screen so we have to run in invisible (headless) mode
	let builder = new Builder().forBrowser("chrome");

	if (process.env.HEADLESS) {
		builder = builder.setChromeOptions(new Chrome.Options().headless());
	} else {
		builder = builder.setChromeOptions(new Chrome.Options());
	}
	driver = builder.build();
});

afterAll(async () => {
	await driver.close();
	await disconnectDb();
});

export default () => driver;
