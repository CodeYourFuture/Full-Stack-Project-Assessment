import React, { useState } from "react";
import DisplayVideos from "./DisplayVideos";

function AddVideo() {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("")
    const [videos, setVideo] = useState([]);

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    function handleUrlChange(event) {
        setUrl(event.target.value)
    }

    function onSubmit(event) {
        event.preventDefault();
        
        setVideo(videos.concat({
            title: title,
            url: url,
            rating: 0
        }))
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Title
                <input type="text" name="video-title" onChange={handleTitleChange} />
                </label>
                <label>URL
                <input type="url" name="video-url" onChange={handleUrlChange} />
                </label>
                <button type="submit">Add Video</button>
            </form>
            {videos.map((video, index) =>
                <DisplayVideos key={index} video={video} />
            )}
        </div>
    );
};

export default AddVideo;