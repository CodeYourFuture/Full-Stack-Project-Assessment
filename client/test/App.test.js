import { render, screen, fireEvent, act } from "@testing-library/react";
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
                        rating: 1234
                    },
                    {
                        id: 2,
                        title: 'Other Title',
                        url: 'https://www.youtube.com/watch?v=KJIHGFEDCBA',
                        rating: 4321
                    }
                ]
            }
        );

		render(<App />);

		await screen.findByText("Test Title");
	});

    it("Renders the videos", async() => {
        const videoContainers = screen.getAllByText((_,e) => e.tagName.toLowerCase() === 'iframe');

        expect(videoContainers.length).toBe(2);
    });

    it("Removes the video when asked to do", async() => {
        fetchMock.delete('/api/videos/1', { success: true });

        const deleteButton = screen.getAllByText('Remove video')[0];

        await act(async () => {
            fireEvent.click(deleteButton);
        });

        const videoContainers = screen.getAllByText((_,e) => e.tagName.toLowerCase() === 'iframe');

        expect(videoContainers.length).toBe(1);
    });

    it("Adds a new video when asked to do", async() => {
        fetchMock.post('/api/videos', { success: true, data: { id: 3, title: "New Title", url: 'https://www.youtube.com/watch?v=CDEYRFUTURE', rating: 0 } });

        fireEvent.change(screen.getByRole("textbox", { name: "Title:" }), {target: {value: 'New Title'}});
        fireEvent.change(screen.getByRole("textbox", { name: "Url:" }), {target: {value: 'https://www.youtube.com/watch?v=CDEYRFUTURE'}});

        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: "Submit" }));
        });

        const videoContainers = screen.getAllByText((_,e) => e.tagName.toLowerCase() === 'iframe');

        expect(videoContainers.length).toBe(3);

        expect(fetchMock).toHaveFetched('matched', {
            method: 'post',
            url: '/api/videos',
            body: { title: "New Title", url: "https://www.youtube.com/watch?v=CDEYRFUTURE" }
        });
    });
});
