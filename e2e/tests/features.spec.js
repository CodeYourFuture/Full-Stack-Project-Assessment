import db from "../../server/db";
import resetDatabase from "./utils";
import { test, expect } from "@playwright/test";

async function openWebsite(page) {
	// Open URL
	await page.goto("http://localhost:3000");
	// Wait for title to appear
	await expect(page.getByText("Video Recommendations")).toBeVisible();
}

async function findVideoByTitle(page, title) {
	// Find the title on the screen
	await expect(page.getByText(title)).toBeVisible();

	const titleComponent = page.getByText(title);
	// Go up a couple levels to find the encompassing component of the video
	// You might need to change this if the structure of your video components differ
	const videoParent = titleComponent.locator("xpath=./../..");

	return videoParent;
}

test.describe("Videos", () => {
	test.beforeEach(async () => {
		await resetDatabase();
	});

	test("Level 130 requirements - display videos", async ({ page }) => {
		// Given I open the website
		await openWebsite(page);

		// Then I am able to see the video entries
		await expect(page.getByText("Never Gonna Give You Up")).toBeVisible();
	});

	test("Level 200 requirements - videos in iframe", async ({ page }) => {
		// Given I have a video from the database
		const videoResults = await db.query("SELECT * FROM videos LIMIT 1");

		// And I open up the website
		await openWebsite(page);

		// Then I am able to see the video's title
		const videoParent = await findVideoByTitle(
			page,
			videoResults.rows[0].title
		);

		// And I am able to see the embedded video
		const videoIframe = videoParent.locator("iframe");
		await expect(videoIframe).toHaveAttribute(
			"src",
			"https://www.youtube.com/embed/" + videoResults.rows[0].url.slice(-11)
		);
	});

	test("Level 210 requirements - add new video", async ({ page }) => {
		// Given I open up the website
		await openWebsite(page);

		// Then I am able to see the upload section
		await expect(page.getByText("Submit a new video")).toBeVisible();

		// And I am able to fill in the details
		await page.getByLabel("Title").fill("The New Title");
		await page
			.getByLabel("Url")
			.fill("https://www.youtube.com/watch?v=ABCDEFGHIJK");

		// When I submit the details
		await page.getByRole("button", { name: "Submit" }).click();

		// Then I am able to see the video's title to appear
		const videoParent = await findVideoByTitle(page, "The New Title");

		// And I am able to see the embedded video
		const videoIframe = videoParent.locator("iframe");
		await expect(videoIframe).toHaveAttribute(
			"src",
			"https://www.youtube.com/embed/ABCDEFGHIJK"
		);

		// And I can see the new video in the database
		const dbResponse = await db.query(
			"SELECT * FROM videos WHERE title = $1 AND url = $2",
			["The New Title", "https://www.youtube.com/watch?v=ABCDEFGHIJK"]
		);
		expect(dbResponse.rows.length).toBe(1);
	});

	test("Level 220 requirements - delete video", async ({ page }) => {
		// Given I have a video from the database
		const videoResults = await db.query("SELECT * FROM videos LIMIT 1");

		// And I open up the website
		await openWebsite(page);

		// Then I am able to see the video's title
		const videoParent = await findVideoByTitle(
			page,
			videoResults.rows[0].title
		);

		// Then I am able to see a button that removes the video
		const deleteButton = videoParent.getByText("Remove video");

		// When I remove the video when pressing the button
		deleteButton.click();

		// Then the video gets removed from the screen
		await expect(page.getByText(videoResults.rows[0].title)).toHaveCount(0);

		// And the video gets removed from the database
		const videoResultsAfterDelete = await db.query(
			"SELECT * FROM videos WHERE id = $1",
			[videoResults.rows[0].id]
		);
		expect(videoResultsAfterDelete.rows.length).toBe(0);
	});

	test("Level 300 requirements - ratings", async ({ page }) => {
		// Given I have a video from the database
		const videoResults = await db.query("SELECT * FROM videos LIMIT 1");

		// And I open up the website
		await openWebsite(page);

		// Then I am able to see the video's title
		const videoParent = await findVideoByTitle(
			page,
			videoResults.rows[0].title
		);

		// And I am able to see a button that adds a vote to the video
		const upVoteButton = videoParent.getByText("Up Vote");

		// And the current rating
		await expect(
			videoParent.getByText(new RegExp(`^${videoResults.rows[0].rating}$`))
		).toBeVisible();

		// When I upvote the video when pressing the button
		upVoteButton.click();

		// Then the vote will update on the screen
		await expect(
			videoParent.getByText(new RegExp(`^${videoResults.rows[0].rating + 1}$`))
		).toBeVisible();

		// And the video will update in the database
		const videoResultsAfterUpvote = await db.query(
			"SELECT * FROM videos WHERE id = $1",
			[videoResults.rows[0].id]
		);
		expect(videoResultsAfterUpvote.rows[0].rating).toBe(
			videoResults.rows[0].rating + 1
		);
	});
});
