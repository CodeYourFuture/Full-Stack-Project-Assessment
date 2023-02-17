import React from "react";
import { VideoVotes } from "./VideoVotes";


export const VideoCards = (props) => {
    return (
        <div>
            <h2>Title</h2>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/{VIDEO_ID_GOES_HERE}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            <div>
                <VideoVotes />
                <button type="button" class="btn btn-primary">
                    Delete
                </button>
            </div>
        </div>
    );
}