import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "fetch-mock-jest";

import App from "../src/App";

let updateVideoFunction = null;
let addVideoFunction = null;
let videosList = null;

jest.mock("../src/components/VideoList", () => ({videos, updateVideo}) => {
    updateVideoFunction = updateVideo;
    videosList = videos;
	return <mock-video-list data-testid="video-list">{videos.map(v => <div key={v.id}>{v.title}</div>)}</mock-video-list>;
});
jest.mock("../src/components/VideoSubmission", () => ({addVideo}) => {
    addVideoFunction = addVideo;
	return <mock-video-submission data-testid="video-submission" />;
});

describe("AddVideo", () => {
    beforeEach(async () => {
        fetchMock.reset();
        fetchMock.get('/api/videos',
            {
                success: true,
                data: []
            }
        );
        render(<App />);

        await screen.findByText("Video Recommendations");
    });

    it("Calls the relevant endpoint to create a new video", async () => {
        fetchMock.post("/api/videos", { success: true, data: { id: 1, title: 'Title', url: 'Url', rating: 0} });

        await act(async () => await addVideoFunction("Title","Url"));

        expect(fetchMock).toHaveFetched('matched', { method: 'post', url: '/api/videos', body: {title: "Title", url: "Url"}});
    });

    it("Adds the new video to the list", async() => {
        fetchMock.post("/api/videos", { success: true, data: { id: 1, title: 'TheNewTitle', url: 'Url', rating: 0} });

        await act(async () => await addVideoFunction("TheNewTitle","Url"));

        expect(videosList).toHaveLength(1);
        expect(videosList[0].title).toBe("TheNewTitle");
    });

    it("Shows an error message in case something went wrong", async() => {
        fetchMock.post("/api/videos", { success: false, message: 'The Message' });

        await act(async () => await addVideoFunction("Title","Url"));

        expect(screen.getByText("The Message")).toBeInTheDocument();
    });
});

describe('UpdateVideo', () => {
    beforeEach(async () => {
        fetchMock.reset();
        fetchMock.get('/api/videos',
            {
                success: true,
                data: [{id: 1, title: "The Title", url: "Url", rating: 10}]
            }
        );
        render(<App />);

        await screen.findByText("The Title");
    });

    ['up','down'].forEach((action) => {
        describe(`Using action ${action}`, () => {
            it("Calls the relevant endpoint to rank up the video", async () => {
                fetchMock.post("/api/videos/1/"+action, { success: true, data: { id: 1, rating: 11} });

                await act(async () => await updateVideoFunction({id: 1}, action));

                expect(fetchMock).toHaveFetched('matched', { method: 'post', url: '/api/videos/1/up'});
            });

            it("Updates the rank of the video", async() => {
                fetchMock.post("/api/videos/1/"+action, { success: true, data: { id: 1, rating: 11} });

                await act(async () => await updateVideoFunction({id: 1},action));

                expect(videosList).toHaveLength(1);
                expect(videosList[0].rating).toBe(11);
            });

            it("Sets an error message in case there are issues", async() => {
                fetchMock.post("/api/videos/1/"+action, { success: false, message: "Not okay"});

                await act(async () => await updateVideoFunction({id: 1}, action));

                expect(videosList).toHaveLength(1);
                expect(videosList[0].message).toBe("Not okay");
            });
        });
    });

    describe("Using action delete", () => {
        it("Calls the relevant endpoint to rank up the video", async () => {
            fetchMock.delete("/api/videos/1", { success: true });

            await act(async () => await updateVideoFunction({id: 1}, "delete"));

            expect(fetchMock).toHaveFetched('matched', { method: 'delete', url: '/api/videos/1'});
        });

        it("Removes the video from the list", async() => {
            fetchMock.delete("/api/videos/1", { success: true });

            await act(async () => await updateVideoFunction({id: 1}, "delete"));

            expect(videosList).toHaveLength(0);
        });

        it("Sets an error message in case there are issues", async() => {
            fetchMock.delete("/api/videos/1", { success: false, message: "Not okay" });

            await act(async () => await updateVideoFunction({id: 1}, "delete"));

            expect(videosList).toHaveLength(1);
            expect(videosList[0].message).toBe("Not okay");
        });
    });
});
