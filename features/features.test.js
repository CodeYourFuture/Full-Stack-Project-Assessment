import getDriver from "./utils/driverSetup";
import db from "../server/db";
import { findByText, waitForTextToDisappear } from "./utils/textUtils";
import { By } from "selenium-webdriver";

let driver;

jest.setTimeout(20000);

async function openWebsite() {
    // Open URL
    driver = getDriver();
    await driver.get("http://localhost:3000");
    // Wait for title to appear
    await findByText("Video Recommendations");
}

async function findVideoByTitle(title) {
    // Find the title on the screen
    const titleComponent = await findByText(title);
    // Go up a couple levels to find the encompassing component of the video
    const videoParent = await titleComponent.findElement(By.xpath("./../.."));

    return videoParent;
}

describe("Videos", () => {
    it("1. Videos should be loaded from the server", async() => {
        // Given I open the website
        openWebsite();

        // Then I am able to see the video entries
        await findByText("Never Gonna Give You Up");
    });

    it("2. For each video, display a React component that contains (...)", async() => {
        // Given I have a video from the database
        const videoResults = await db.query("SELECT * FROM videos LIMIT 1");

        // And I open up the website
        await openWebsite();

        // Then I am able to see the video's title
        const videoParent = await findVideoByTitle(videoResults.rows[0].title);

        // And I am able to see the embedded video
        const videoIframe = await videoParent.findElement(By.css("iframe"));

        expect(await videoIframe.getAttribute('src')).toBe("https://www.youtube.com/embed/" + videoResults.rows[0].url.slice(-11));

        // And I am able to see the number of votes the video has
        await findByText(videoResults.rows[0].rating, 1000, videoParent);

        // And I am able to see a button that removes the video
        const deleteButton = await findByText("Remove video", 1000, videoParent);

        // When I remove the video when pressing the button
        await deleteButton.click();

        // Then the video gets removed from the screen
        await waitForTextToDisappear(videoResults.rows[0].title, 5000);

        // And the video gets removed from the database
        const videoResultsAfterDelete = await db.query("SELECT * FROM videos WHERE id = $1",[videoResults.rows[0].id]);
        expect(videoResultsAfterDelete.rows.length).toBe(0);
    });

    it("3. On each video submission there should be an upvote button", async () => {
        // Given I have a video from the database
        const videoResults = await db.query("SELECT * FROM videos LIMIT 1");

        // And I open up the website
        await openWebsite();

        // Then I am able to see the video's title
        const videoParent = await findVideoByTitle(videoResults.rows[0].title);

        // And I am able to see a button that adds a vote to the video
        const upVoteButton = await findByText("Up Vote", 1000, videoParent);

        // When I upvote the video when pressing the button
        await upVoteButton.click();

        // Then the vote will update on the screen
        await findByText(videoResults.rows[0].rating + 1);

        // And the video will update in the database
        const videoResultsAfterUpvote = await db.query("SELECT * FROM videos WHERE id = $1",[videoResults.rows[0].id]);
        expect(videoResultsAfterUpvote.rows[0].rating).toBe(videoResults.rows[0].rating + 1);
    });

    it("4. On the page there must be another React component that will add a Video", async () => {
        // Given I open up the website
        await openWebsite();

        // Then I am able to see the upload section
        await findByText("Submit a new video");

        // And I am able to fill in the details
        const titleInput = getDriver().findElement(By.css("[name=title]"));
        await titleInput.clear();
        await titleInput.sendKeys("The New Title");

        const urlInput = getDriver().findElement(By.css("[name=url]"));
        await urlInput.clear();
        await urlInput.sendKeys("https://www.youtube.com/watch?v=ABCDEFGHIJK");

        // When I submit the details
        const submitButton = getDriver().findElement(By.css("button[type=submit]"));
        await submitButton.click();

        // Then I am able to see the video's title to appear
        const videoParent = await findVideoByTitle("The New Title");

        // And I am able to see the embedded video
        const videoIframe = await videoParent.findElement(By.css("iframe"));
        expect(await videoIframe.getAttribute('src')).toBe("https://www.youtube.com/embed/ABCDEFGHIJK");

        // And I can see the new video in the database
        const dbResponse = await db.query("SELECT * FROM videos WHERE title = $1 AND url = $2",["The New Title", "https://www.youtube.com/watch?v=ABCDEFGHIJK"]);
        expect(dbResponse.rows.length).toBe(1);
    });
});
