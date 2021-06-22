import React, { useState } from "react";
import DisplayVideos from "./DisplayVideos";

function AddVideo() {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("")
    const [videos, setVideos] = useState([]);
   
    function remove(video) {
        console.log(videos.filter(item => item !== video))
        setVideos(videos.filter(item => item !== video))
    }

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    function handleUrlChange(event) {
        setUrl(event.target.value)
    }

    function onSubmit(event) {
        event.preventDefault();
        setVideos([{
            title: title,
            url: url,
            rating: 0
        }].concat(videos)
        )
    }
    console.log(videos)

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
            {videos.map((video, index) =>(
                <DisplayVideos key={index} video={video} remove={remove}/>
            ))}
        </div>
    );
};

export default AddVideo;