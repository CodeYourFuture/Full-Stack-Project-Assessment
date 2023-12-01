import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Video from "../../src/components/VideoSubmission";
import VideoSubmission from "../../src/components/VideoSubmission";

let addVideoMock = null;

describe("Main Page", () => {
    beforeEach(async () => {
        addVideoMock = jest.fn();

		render(<VideoSubmission addVideo={addVideoMock}/>);

		await screen.findByText("Submit a new video");
	});

    describe("Rendering", () => {
        it("Renders the title input", async () => {
            expect(screen.getByRole("textbox", { name: "Title:" })).toBeInTheDocument();
        });

        it("Renders the url input", async() => {
            expect(screen.getByRole("textbox", { name: "Url:" })).toBeInTheDocument();
        });

        it("Renders the submit button", async() => {
            expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
        });
    });

    describe("Validation", () => {
        it("Marks the title box as invalid if it's empty", () => {
            const input = screen.getByRole("textbox", { name: "Title:" });

            fireEvent.change(input, {target: {value: 'a'}});
            fireEvent.change(input, {target: {value: ''}});

            expect(input.classList).toContain("invalid");
        });

        it("Marks the title box as valid if it's not empty", () => {
            const input = screen.getByRole("textbox", { name: "Title:" });

            fireEvent.change(input, {target: {value: 'a'}});

            expect(input.classList).toContain("valid");
        });

        it("Marks the url box as invalid if it's empty", () => {
            const input = screen.getByRole("textbox", { name: "Url:" });

            fireEvent.change(input, {target: {value: 'a'}});
            fireEvent.change(input, {target: {value: ''}});

            expect(input.classList).toContain("invalid");
        });

        it("Marks the url box as invalid if it's not a youtube url", () => {
            const input = screen.getByRole("textbox", { name: "Url:" });

            fireEvent.change(input, {target: {value: 'https://codeyourfuture.io'}});

            expect(input.classList).toContain("invalid");
        });

        it("Marks the url box as valid if it's a proper youtube url", () => {
            const input = screen.getByRole("textbox", { name: "Url:" });

            fireEvent.change(input, {target: {value: 'https://www.youtube.com/watch?v=ABCDEFGHIJK'}});

            expect(input.classList).toContain("valid");
        });
    });

    describe("Action", () => {
        it("Sends valid input when submitting", () => {
            fireEvent.change(screen.getByRole("textbox", { name: "Title:" }), {target: {value: 'a'}});
            fireEvent.change(screen.getByRole("textbox", { name: "Url:" }), {target: {value: 'https://www.youtube.com/watch?v=ABCDEFGHIJK'}});

            fireEvent.click(screen.getByRole("button", { name: "Submit" }));

            expect(addVideoMock).toHaveBeenCalledWith('a','https://www.youtube.com/watch?v=ABCDEFGHIJK');
        });

        it("Does not send invalid input when submitting", () => {
            fireEvent.change(screen.getByRole("textbox", { name: "Title:" }), {target: {value: 'a'}});
            fireEvent.change(screen.getByRole("textbox", { name: "Url:" }), {target: {value: 'https://www.yay.com/watch?v=ABCDEFGHIJK'}});

            fireEvent.click(screen.getByRole("button", { name: "Submit" }));

            expect(addVideoMock).not.toHaveBeenCalled();
        });
    });
});
