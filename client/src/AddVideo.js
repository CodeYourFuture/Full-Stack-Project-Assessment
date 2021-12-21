import React, { useState } from "react";
import { v4 as uuid } from 'uuid';



const AddVideo = (props) => {
    const [videoTitle, setVideoTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    // console.log(props)

    function handleTitleInput(evt) {
        setVideoTitle(evt.target.value);
    }

    function handleUrlInput(evt) {
        setVideoUrl(evt.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        let newVideo = {
            "id": uuid(),
            "title": videoTitle,
            "url": videoUrl,
            "rating": 0
          }
        //   console.log(newVideo)
        
        props.setVideoList(props.videoList.concat(newVideo));
        setVideoTitle("");
        setVideoUrl("");
    }
    // console.log(props.videoList)
    return (
        <div className="add-wrapper">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    <p>Video Title</p>
                    <input type="text" name="title" value={videoTitle} onChange={handleTitleInput}></input>
                </label>
                <label htmlFor="url">
                    <p>Video Url</p>
                    <input type="url" name="url" value={videoUrl} onChange={handleUrlInput}></input>
                </label>
                <div>
                <button type="submit" className="add-btn">Add Video</button>
                </div>
            </form>
        </div>
    )
}


export default AddVideo;