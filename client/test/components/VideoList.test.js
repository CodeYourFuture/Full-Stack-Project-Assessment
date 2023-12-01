import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import VideoList from "../../src/components/VideoList";

const videos = [{
    id: 1,
    title: "The Title",
    url: "https://www.youtube.com/watch?v=ABCDEFGHIJK",
    rating: 1234
},{
    id: 2,
    title: "Other Title",
    url: "https://www.youtube.com/watch?v=ABCDEFGHIJL",
    rating: 4321
}]

describe("Main Page", () => {
    beforeEach(async () => {
		render(<VideoList videos={videos}/>);

		await screen.findByText("The Title");
	});

    describe("Rendering", () => {
        it("Renders the first video", async () => {
            expect(screen.getByText("The Title")).toBeInTheDocument();
        });

        it("Renders the second video", async() => {
            expect(screen.getByTitle("Other Title")).toBeInTheDocument();
        });
    });
});
