import React from "react";
import DisplayVideos from "./DisplayVideos";
import AddVideo from "./AddVideo";

const videos = require("../data/exampleresponse.json");

function Videos() {
    return (
        <>
            <div className="videos-list">
                <AddVideo />
                {videos.map((video, index) =>
                <DisplayVideos key={index} video={video} />
                )}
            </div>
        </>
    );
}

export default Videos;