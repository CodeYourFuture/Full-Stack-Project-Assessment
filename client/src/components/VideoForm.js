import React, { useState } from "react";
import SearchBox from "./SearchBox";
import { useGlobalContext } from "../Context"
import uuid from 'react-native-uuid';



const VideoForm = () => {
    const { data, setData } = useGlobalContext();
    const [click, setClick] = useState(false)
    const [video, setVideo] = useState(
        {
            "id": uuid.v4(),
            "title": "",
            "url": "",
            "rating": 0
        }
    )

    function handleClick() {
        !click ? setClick(true) : setClick(false)
    }

    function handleChange(e) {
        const value = e.target.value
        if (e.target.name === "title") {
            setVideo(
                {
                    "id": uuid.v4(),
                    "title": value,
                    "url": video.url,
                    "rating": 0
                }
            )
        }
        if (e.target.name === "url") {
            setVideo(
                {
                    "id": uuid.v4(),
                    "title": video.title,
                    "url": value,
                    "rating": 0,
                    "time": new Date()
                    
                }
            )
        }

    }
    console.log(new Date())

    function handleAddVideo(e) {
        e.preventDefault()
        const videoId = video.url.split("=");
        const urlVideo = `https://www.youtube.com/embed/${videoId[1]}`
        
        video.title && urlVideo ? setData(data.concat(video)) : alert("Please fill both title and url sections with YouTube url")
        
        setVideo(
            {
                "id": uuid.v4(),
                "title": "",
                "url": "",
                "rating": 0
               
            }
        )
    }


    return (
        <div className="row justify-content-around">
        <div className="w-25 mt-5">
            <button type="button" className="row btn btn-primary ml-2 mb-1" onClick={handleClick}>Add Video</button>
            {click ?
                <div>
                    <form className="ml-3" noValidate>
                        <div className="row m-3">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                            <div class="col-sm-10">
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={video.title}
                                className="form-control"
                                onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="row m-3">
                            <label htmlFor="url" className="col-sm-2 col-form-label">URL</label>
                            <div class="col-sm-10">
                            <input
                                name="url"
                                id="url"
                                type="url"
                                value={video.url}
                                className="form-control"
                                onChange={handleChange} required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary m-2" onClick={handleAddVideo}>Submit</button>
                        <button type="cancel" className="btn btn-warning m-2" onClick={handleClick}>Cancel</button>
                    </form>
                    
                </div> : null
            }
        </div>
            <div className="m-5">
                <SearchBox />
            </div>
        </div>

    )
}

export default VideoForm;