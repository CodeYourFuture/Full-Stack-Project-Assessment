import {
	render,
	screen,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";

import { server } from "./tests/setupTests.js";

import App from "./App.jsx";

describe("Main Page", () => {
	/** @type {import("@testing-library/user-event").UserEvent} */
	let user;

	beforeEach(async () => {
		// Here we create a fake backend that will always return two videos when calling the /api/videos endpoint
		server.use(
			http.get("/api/videos", () =>
				HttpResponse.json([
					{
						id: 1,
						title: "Never Gonna Give You Up",
						url: "https://www.youtube.com/watch?v=ABCDEFGHIJK",
					},
					{
						id: 2,
						title: "Other Title",
						url: "https://www.youtube.com/watch?v=KJIHGFEDCBA",
					},
				])
			)
		);

		// Let's render our app
		render(<App />);

		// Let's wait for one of the videos to appear
		await screen.findByText("Never Gonna Give You Up");
		user = userEvent.setup();
	});

	it("Renders the videos", async () => {
		// calculate how many iframes there are on the website
		const videoContainers = screen.getAllByText(
			(_, e) => e.tagName.toLowerCase() === "iframe"
		);

		// We have two videos, so the amount should be two
		expect(videoContainers).toHaveLength(2);
	});

	it("Removes the video when asked to do", async () => {
		// we create another fake backend that listens on the delete call, and returns success
		server.use(
			http.delete("/api/videos/1", () => HttpResponse.json({ success: true }))
		);

		// we find the delete button on the website
		const deleteButton = screen.getAllByText("Remove video")[0];

		// then we click it
		await user.click(deleteButton);

		// wait for the video to get deleted from the page
		await waitForElementToBeRemoved(deleteButton);

		// we calculate the number of videos after the call
		const videoContainers = screen.getAllByText(
			(_, e) => e.tagName.toLowerCase() === "iframe"
		);

		// this should now be only 1
		expect(videoContainers).toHaveLength(1);
	});

	it("Adds a new video when asked to do", async () => {
		const title = "New Title";
		const url = "https://www.youtube.com/watch?v=CDEYRFUTURE";

		// we set up a fake backend that allows us to send a new video. It only allows one specific title and url however
		server.use(
			http.post("/api/videos", async ({ request }) => {
				const data = await request.json();
				if (data.title !== title || data.url !== url) {
					return HttpResponse.json({ success: false }, { status: 400 });
				}
				return HttpResponse.json({ id: 3, title, url });
			})
		);

		// we fill in the form
		await user.type(screen.getByRole("textbox", { name: "Title:" }), title);
		await user.type(screen.getByRole("textbox", { name: "Url:" }), url);

		// then click submit
		await user.click(screen.getByRole("button", { name: "Submit" }));

		// wait for the new video to appear
		await screen.findByText(title);

		// afterwards we calculate the number of videos on the page
		const videoContainers = screen.getAllByText(
			(_, e) => e.tagName.toLowerCase() === "iframe"
		);

		// this should now be three
		expect(videoContainers).toHaveLength(3);
	});
});
