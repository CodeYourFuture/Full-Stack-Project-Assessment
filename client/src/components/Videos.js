import React from "react";
import Video from "./Video"
import VideoForm from "./VideoForm";
const Videos = () => {
    return (
        <div className="ml-3">
            <VideoForm />
            <div className="row">
                <Video />
            </div>
        </div>
    )
}

export default Videos;