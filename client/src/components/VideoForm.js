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
                    "rating": 0
                }
            )
        }

    }
    console.log(video)

    function handleAddVideo(e) {
        e.preventDefault()
        video.title && video.url ? setData(data.concat(video)) : alert("Please fill both title and url sections")
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
        <div className="row">
            <button type="button" className="btn btn-primary" onClick={handleClick}>Primary</button>
            {click ?
                <div>
                    <form className="w-25 ml-3" noValidate>
                        <div className="mb-3">
                            <label htmlFor="title"  className="form-label">Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={video.title}
                                className="form-control"
                                onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="url" className="form-label">URL</label>
                            <input
                                name="url"
                                id="url"
                                type="url"
                                value={video.url}
                                className="form-control"
                                onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary m-2" onClick={handleAddVideo}>Submit</button>
                        <button type="cancel" className="btn btn-warning m-2" onClick={handleClick}>Cancel</button>
                    </form>
                    <div className="m-5">
                    </div>
                    <SearchBox />
                </div> : null
            }
        </div>

    )
}

export default VideoForm;