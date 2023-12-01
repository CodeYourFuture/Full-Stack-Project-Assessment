import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Video from "../../src/components/Video";

const video = {
    id: 1,
    title: "The Title",
    url: "https://www.youtube.com/watch?v=ABCDEFGHIJK",
    rating: 1234
}
let updateVideoMock = null;

describe("Main Page", () => {
    beforeEach(async () => {
        updateVideoMock = jest.fn();

		render(<Video video={video} updateVideo={updateVideoMock}/>);

		await screen.findByText("The Title");
	});

    describe("Rendering", () => {
        it("Renders the title", async () => {
            expect(screen.getByText("The Title")).toBeInTheDocument();
        });

        it("Renders the video", async() => {
            expect(screen.getByTitle("The Title").src).toBe("https://www.youtube.com/embed/ABCDEFGHIJK");
        });

        it("Renders the rating", async() => {
            expect(screen.getByText(1234)).toBeInTheDocument();
        });
    });

    describe("Actions", () => {
        it("Renders the delete button", async() => {
            expect(screen.getByRole('button', { name: 'Remove video' })).toBeInTheDocument();
        });

        it("Calls the delete action when pressed", async() => {
            fireEvent.click(screen.getByRole('button', { name: 'Remove video' }));

            expect(updateVideoMock).toHaveBeenCalledWith(video, 'delete');
        });

        it("Renders the vote up button", async() => {
            expect(screen.getByRole('button', { name: 'Up Vote' })).toBeInTheDocument();
        });

        it("Calls the up vote action when pressed", async() => {
            fireEvent.click(screen.getByRole('button', { name: 'Up Vote' }));

            expect(updateVideoMock).toHaveBeenCalledWith(video, 'up');
        });

        it("Renders the vote down button", async() => {
            expect(screen.getByRole('button', { name: 'Down Vote' })).toBeInTheDocument();
        });

        it("Calls the up vote action when pressed", async() => {
            fireEvent.click(screen.getByRole('button', { name: 'Down Vote' }));

            expect(updateVideoMock).toHaveBeenCalledWith(video, 'down');
        });
    });
});
