import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "fetch-mock-jest";

import App from "../src/App";

describe("Main Page", () => {
    beforeEach(async () => {
        fetchMock.reset();
        fetchMock.get('/api/videos',
            {
                success: true,
                data: [
                    {
                        id: 1,
                        title: 'Test Title',
                        url: 'https://www.youtube.com/watch?v=ABCDEFGHIJK',
                        rating: 20
                    }
                ]
            }
        );

		render(<App />);

		await screen.findByText("Video Recommendations");
	});

    it("Renders the title", async () => {
		expect(screen.getByText("Video Recommendations")).toBeInTheDocument();
	});

    it("Renders the test video", async() => {
        expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    it("Renders the submission box", async() => {
        expect(screen.getByRole("form", { name: 'Submit a new video' })).toBeInTheDocument();
    });
});
